import type { APIRoute } from 'astro';
import { auth } from '@wix/essentials';
import { submissions } from '@wix/forms';
import { handleCareerApplication } from './career-application-handler.mjs';
export const prerender = false;
const driver = {
  uploadUrl: (...args) => auth.elevate(submissions.getMediaUploadUrl)(...args),
  upload: async (url, mimeType, bytes) => {
    const response = await fetch(url, { method: 'PUT', headers: { 'Content-Type': mimeType }, body: bytes });
    if (!response.ok) throw new Error('UPLOAD_FAILED');
    return response.json();
  },
  create: value => auth.elevate(submissions.createSubmission)(value),
  confirm: id => auth.elevate(submissions.confirmSubmission)(id),
};
export const ALL: APIRoute = ({ request }) => handleCareerApplication(request, driver);
