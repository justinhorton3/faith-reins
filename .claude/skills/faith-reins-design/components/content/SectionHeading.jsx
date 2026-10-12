import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';
import { TextLink } from '../core/TextLink.jsx';

export function SectionHeading({ eyebrow, title, body, linkLabel, onLink, tone = 'dark', titleFace = 'display', align = 'left', size = 'md', style }) {
  const bp = useBreakpoint();
  const dark = tone === 'dark';
  const px = size === 'sm' ? { desktop: 34, tablet: 32, mobile: 28 }[bp] : { desktop: 46, tablet: 40, mobile: 32 }[bp];
  const face = titleFace === 'display' ? '400 ' + px + 'px/1.06 var(--font-display)' : '400 ' + px + 'px/1.12 var(--font-serif)';
  const center = align === 'center';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignItems: center ? 'center' : 'flex-start', textAlign: center ? 'center' : 'left', maxWidth: center ? 760 : undefined, margin: center ? '0 auto' : undefined, ...style }}>
      {eyebrow ? <Eyebrow tone={dark ? 'dark' : 'light'}>{eyebrow}</Eyebrow> : null}
      <h2 style={{ margin: 0, font: face, color: dark ? 'var(--fr-green)' : 'var(--fr-cream)', textWrap: 'balance' }}>{title}</h2>
      {body ? <p style={{ margin: 0, fontSize: bp === 'mobile' ? 16 : 17, lineHeight: 1.65, color: dark ? 'var(--fr-muted)' : 'var(--text-on-inverse-muted)', maxWidth: center ? 620 : 520, textWrap: 'pretty' }}>{body}</p> : null}
      {linkLabel ? <TextLink tone={dark ? 'dark' : 'light'} onClick={onLink} style={{ alignSelf: center ? 'center' : 'flex-start' }}>{linkLabel}</TextLink> : null}
    </div>
  );
}
