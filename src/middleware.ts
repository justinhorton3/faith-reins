import { defineMiddleware } from 'astro:middleware';
import { isTrustedRequestOrigin } from './server/request-origin.mjs';
// Preserve Astro's form CSRF protection while allowing Wix's public proxy origins.
export const onRequest = defineMiddleware(({ request, isPrerendered }, next) => {
  const unsafe = !['GET', 'HEAD', 'OPTIONS'].includes(request.method);
  const type = request.headers.get('content-type');
  const formLike = !type || /application\/x-www-form-urlencoded|multipart\/form-data|text\/plain/i.test(type);
  if (!isPrerendered && unsafe && formLike && !isTrustedRequestOrigin(request)) {
    return new Response('Cross-site form submissions are forbidden', { status: 403 });
  }
  return next();
});
