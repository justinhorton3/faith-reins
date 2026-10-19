const MIME_TYPES = { pdf: 'application/pdf', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
export function validateResume(file) {
  if (!file || !file.size) return 'Choose your résumé before submitting.';
  if (!MIME_TYPES[file.name.split('.').pop().toLowerCase()]) return 'Please upload a PDF or Word document (.pdf, .doc, or .docx).';
  if (file.size > 10 * 1024 * 1024) return 'This file is over 10 MB. Please choose a smaller résumé.';
  return '';
}
const form = typeof document === 'undefined' ? null : document.querySelector('[data-career-application]');
if (form) {
  const role = form.elements.namedItem('role');
  const submit = form.querySelector('[data-application-submit]');
  const fileInput = form.elements.namedItem('resume');
  const fieldset = form.querySelector('fieldset');
  const fileError = form.querySelector('#application-file-error');
  const error = form.querySelector('[data-application-error]');
  const progress = form.querySelector('[data-application-progress]');
  const label = submit.innerHTML;
  let submitting = false;
  let requestKey = crypto.randomUUID();
  const updateRole = () => {
    const leadership = role.value === 'Clinical Director';
    form.querySelector('[data-leadership-field]').hidden = !leadership;
    form.elements.namedItem('leadership_years').disabled = !leadership;
    form.querySelector('[data-focus-hint]').textContent = leadership ? 'Tell us about your pediatric clinical background, multidisciplinary caseload management, and provider relationships.' : 'A few sentences about the ages, needs, and treatment areas you know best.';
  };
  const slug = new URLSearchParams(location.search).get('role');
  const option = [...role.options].find(option => option.dataset.slug === slug);
  if (option) role.value = option.value;
  role.addEventListener('change', updateRole);
  updateRole();
  form.addEventListener('input', () => { if (!submitting) requestKey = crypto.randomUUID(); });
  form.addEventListener('change', () => { if (!submitting) requestKey = crypto.randomUUID(); });
  submit.disabled = false;
  fileInput.addEventListener('change', () => {
    requestKey = crypto.randomUUID();
    const message = validateResume(fileInput.files[0]);
    fileError.textContent = message;
    fileError.hidden = !message;
    fileInput.setCustomValidity(message);
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submitting) return;
    error.hidden = true;
    const file = fileInput.files[0];
    const validation = validateResume(file);
    fileInput.setCustomValidity(validation);
    fileError.textContent = validation;
    fileError.hidden = !validation;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    submitting = true;
    submit.disabled = true;
    fieldset.disabled = true;
    progress.hidden = false;
    try {
      progress.textContent = 'Uploading your résumé and submitting your application…';
      const response = await fetch('/api/careers/applications', { method: 'POST', headers: { 'Idempotency-Key': requestKey }, body: data });
      const result = await response.json();
      if (!response.ok) throw new Error('Application could not be confirmed');
      if (result.submission?.status !== 'CONFIRMED' || !result.submission.id) throw new Error('Your application has not been confirmed. Please try again.');
      const success = form.parentElement.querySelector('[data-application-success]');
      success.querySelector('[data-application-reference]').textContent = `Application reference: ${result.submission.id}`;
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } catch (failure) {
      error.textContent = 'We could not finish your application. Your entries are still here. Please try again, or email your résumé to info@faithreins.com.';
      error.hidden = false;
      progress.hidden = true;
      fieldset.disabled = false;
      updateRole();
      submit.disabled = false;
      submit.innerHTML = label;
      submitting = false;
    }
  });
}
