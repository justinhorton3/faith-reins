import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';
import { PhotoSlot } from './PhotoSlot.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';

export function ProfileCard({ image, imagePosition = 'center', placeholder, eyebrow, name, body, ratio = '4 / 5' }) {
  const bp = useBreakpoint();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {image ? <img src={image} alt={name} loading="lazy" style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', objectPosition: imagePosition, display: 'block' }} /> : <PhotoSlot label={placeholder || 'Portrait'} ratio={ratio} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <span style={{ font: '400 ' + (bp === 'mobile' ? 24 : 26) + 'px/1.15 var(--font-serif)', color: 'var(--fr-green)' }}>{name}</span>
        {body ? <span style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fr-muted)', textWrap: 'pretty' }}>{body}</span> : null}
      </div>
    </div>
  );
}

export function ProfileGrid({ children, columns = 4 }) {
  const bp = useBreakpoint();
  const n = bp === 'mobile' ? 1 : bp === 'tablet' ? 2 : columns;
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + n + ', minmax(0,1fr))', gap: bp === 'mobile' ? 40 : '48px 32px' }}>{children}</div>;
}
