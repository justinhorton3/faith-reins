// Public origins for this Wix site; never trust client-supplied forwarded headers.
export function isTrustedRequestOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  if (origin === new URL(request.url).origin) return true;
  if (origin === 'https://www.faithreins.com' || origin === 'https://faithreins.com') return true;
  return /^https:\/\/rm8sny-headless-[a-z0-9]+-donnaehorton-140c\.wix-site-host\.com$/.test(origin);
}
