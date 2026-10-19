import { CAREER_FORM_ID, CAREER_ROLES, MAX_RESUME_BYTES } from '../lib/career-application-config.mjs';
const attempts = new Map();
const completed = new Map();
const pending = new Map();
const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const reply = (status, value) => new Response(JSON.stringify(value), { status, headers });
const types = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
export async function handleCareerApplication(request, driver) {
  if (request.method !== 'POST') return reply(405, { error: 'METHOD_NOT_ALLOWED' });
  if (request.headers.get('origin') !== new URL(request.url).origin) return reply(403, { error: 'INVALID_ORIGIN' });
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data')) return reply(415, { error: 'MULTIPART_REQUIRED' });
  if (Number(request.headers.get('content-length') || 0) > MAX_RESUME_BYTES + 64000) return reply(413, { error: 'RESUME_TOO_LARGE' });
  const key = request.headers.get('idempotency-key');
  if (!key || !/^[a-f0-9-]{36}$/i.test(key)) return reply(400, { error: 'INVALID_REQUEST' });
  const cached = completed.get(key);
  if (cached && cached.expires > Date.now()) return reply(200, cached.value);
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) {
    const now = Date.now();
    const count = attempts.get(ip);
    if (count && count.expires > now && count.value >= 8) return reply(429, { error: 'PLEASE_TRY_LATER' });
    attempts.set(ip, count && count.expires > now ? { ...count, value: count.value + 1 } : { value: 1, expires: now + 600000 });
    for (const [id, entry] of attempts) if (entry.expires < now) attempts.delete(id);
  }
  try {
    const data = await request.formData();
    if (String(data.get('website') || '').trim()) return reply(400, { error: 'INVALID_REQUEST' });
    const values = {};
    for (const [name, limit, required] of [['full_name',150,true],['email',254,true],['phone',40,true],['clinical_background',2000,true],['availability',1500,false]]) {
      const raw = data.get(name);
      if (raw !== null && typeof raw !== 'string') return reply(400, { error: 'INVALID_FIELDS' });
      const value = String(raw || '').trim();
      if ((required && !value) || value.length > limit) return reply(400, { error: 'INVALID_FIELDS' });
      if (value) values[name] = value;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return reply(400, { error: 'INVALID_EMAIL' });
    const role = data.get('role');
    const license = data.get('arkansas_license');
    if (!CAREER_ROLES.includes(role) || !['Active and unrestricted','Pending / in process','Not currently licensed'].includes(license)) return reply(400, { error: 'INVALID_FIELDS' });
    values.role = role;
    values.arkansas_license = license;
    for (const name of ['pediatric_years', 'leadership_years']) {
      const value = data.get(name);
      if ((value === null || value === '') && name === 'leadership_years') continue;
      const number = Number(value);
      if (value === null || value === '' || !Number.isFinite(number) || number < 0 || number > 80) return reply(400, { error: 'INVALID_EXPERIENCE' });
      if (name !== 'leadership_years' || role === 'Clinical Director') values[name] = number;
    }
    const file = data.get('resume');
    if (!file || typeof file.arrayBuffer !== 'function' || !file.size || file.size > MAX_RESUME_BYTES) return reply(400, { error: 'INVALID_RESUME' });
    const extension = file.name.split('.').pop().toLowerCase();
    const mimeType = types[extension];
    if (!mimeType) return reply(400, { error: 'INVALID_RESUME_TYPE' });
    const bytes = new Uint8Array(await file.arrayBuffer());
    const signature = extension === 'pdf' ? [37,80,68,70,45] : extension === 'doc' ? [208,207,17,224,161,177,26,225] : [80,75,3,4];
    if (!signature.every((byte, index) => bytes[index] === byte)) return reply(400, { error: 'INVALID_RESUME_TYPE' });
    const filename = file.name.replace(/[^a-zA-Z0-9._ -]/g, '_').slice(-150);
    let submission;
    const existing = pending.get(key);
    if (existing && existing.expires > Date.now()) submission = existing.submission;
    else {
    const { uploadUrl } = await driver.uploadUrl(CAREER_FORM_ID, filename, mimeType, { uploadTarget: 'resume' });
    const upload = await driver.upload(uploadUrl, mimeType, bytes);
    const saved = upload.file;
    if (!saved?.id || saved.private !== true || saved.operationStatus === 'FAILED') throw new Error('PRIVATE_UPLOAD_FAILED');
    const created = await driver.create({ formId: CAREER_FORM_ID, submissions: { ...values, resume: [{ fileId: saved.id, displayName: filename, url: saved.url, fileType: mimeType }] } });
    submission = created.submission || created;
    pending.set(key, { submission, expires: Date.now() + 900000 });
    }
    if (submission.status === 'PENDING') {
      const confirmed = await driver.confirm(submission._id || submission.id);
      submission = confirmed.submission || confirmed;
    }
    const id = submission._id || submission.id;
    if (!id || submission.status !== 'CONFIRMED') throw new Error('SUBMISSION_NOT_CONFIRMED');
    pending.delete(key);
    const result = { submission: { id, status: 'CONFIRMED' } };
    completed.set(key, { value: result, expires: Date.now() + 900000 });
    for (const cache of [completed, pending, attempts]) {
      for (const [id, entry] of cache) if (entry.expires < Date.now()) cache.delete(id);
      while (cache.size > 1000) cache.delete(cache.keys().next().value);
    }
    return reply(200, result);
  } catch {
    return reply(502, { error: 'APPLICATION_NOT_CONFIRMED' });
  }
}
