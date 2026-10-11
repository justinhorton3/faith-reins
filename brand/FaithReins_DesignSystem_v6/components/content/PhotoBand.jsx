import React from 'react';
import { useBreakpoint, gutter } from '../core/responsive.jsx';
import { PhotoSlot } from './PhotoSlot.jsx';

export function PhotoBand({ image, imagePosition = 'center', caption, height }) {
  const bp = useBreakpoint();
  const h = height || { desktop: 520, tablet: 380, mobile: 280 }[bp];
  return (
    <figure style={{ margin: 0, position: 'relative' }}>
      <img src={image} alt="" loading="lazy" style={{ display: 'block', width: '100%', height: h, objectFit: 'cover', objectPosition: imagePosition }} />
      {caption ? <figcaption style={{ padding: '14px ' + gutter(bp) + 'px', fontSize: 14, lineHeight: 1.5, color: 'var(--fr-muted)', borderBottom: '1px solid var(--fr-line)' }}>{caption}</figcaption> : null}
    </figure>
  );
}

export function PhotoStrip({ images = [], placeholders = [], ratio = '4 / 5' }) {
  const bp = useBreakpoint();
  const n = bp === 'mobile' ? 1 : 3;
  const cells = images.length ? images.map((src, i) => <img key={i} src={src} alt="" loading="lazy" style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', display: 'block' }} />) : placeholders.map((p, i) => <PhotoSlot key={i} label={p} ratio={bp === 'mobile' ? '4 / 3' : ratio} />);
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + n + ', minmax(0,1fr))', gap: bp === 'mobile' ? 12 : 20 }}>{cells}</div>;
}
