// Read the controlled markup emitted by our hero component. Reuse its approved
// image and dimensions for social previews without introducing another asset.
export function heroSocialImage(body = '') {
  const tag = body.match(/<img\b[^>]*\bclass="[^"]*\bhero__img\b[^"]*"[^>]*>/i)?.[0];
  if (!tag) return null;
  const attrs = Object.fromEntries([...tag.matchAll(/\s([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2]]));
  if (!attrs.src) return null;
  return { url: new URL(attrs.src, 'https://www.faithreins.com').href, width: Number(attrs.width) || undefined, height: Number(attrs.height) || undefined };
}
