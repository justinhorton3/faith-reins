import React from 'react';
import { useBreakpoint, gutter, sectionY } from '../core/responsive.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';

export function SplitFeature({ image, imagePosition = 'center', eyebrow, title, body, actions, variant = 'inset', reverse = false, background }) {
  const bp = useBreakpoint();
  const g = gutter(bp);
  const d = bp === 'desktop';
  const stack = bp === 'mobile' || (bp === 'tablet' && variant === 'bleed');
  const bleed = variant === 'bleed';
  const ts = d ? (bleed ? 46 : 50) : bp === 'tablet' ? 38 : 30;
  const text = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: d ? 26 : 20, justifyContent: 'center', padding: bleed ? (stack ? sectionY(bp) * 0.7 + 'px ' + g + 'px' : '88px ' + g + 'px') : 0 }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 style={{ margin: 0, font: '400 ' + ts + 'px/1.1 var(--font-serif)', color: 'var(--fr-green)', textWrap: 'balance' }}>{title}</h2>
      {body ? <p style={{ margin: 0, fontSize: bp === 'mobile' ? 16 : 17, lineHeight: 1.7, color: 'var(--fr-muted)', maxWidth: 480 }}>{body}</p> : null}
      {actions ? <div style={{ display: 'flex', flexDirection: bp === 'mobile' ? 'column' : 'row', gap: bp === 'mobile' ? 20 : 28, alignItems: bp === 'mobile' ? 'stretch' : 'center' }}>{actions}</div> : null}
    </div>
  );
  const ih = stack ? (bp === 'mobile' ? 300 : 420) : bleed ? 560 : (d ? 520 : 420);
  const img = image ? <img src={image} alt="" loading="lazy" style={{ width: '100%', height: ih, objectFit: 'cover', objectPosition: imagePosition, display: 'block' }} /> : <div style={{ height: ih, background: 'var(--fr-sand)' }} />;
  const imgFirst = stack ? true : (bleed ? reverse : !reverse);
  return (
    <section style={{ display: 'grid', gridTemplateColumns: stack ? 'minmax(0,1fr)' : '1fr 1fr', gap: bleed ? 0 : (stack ? 32 : d ? 72 : 40), padding: bleed ? 0 : sectionY(bp) + 'px ' + g + 'px', alignItems: 'center', background: background || (bleed ? 'var(--fr-sand)' : 'transparent'), maxWidth: bleed ? undefined : 1312 + 2 * g, margin: '0 auto' }}>
      {imgFirst ? <>{img}{text}</> : <>{text}{img}</>}
    </section>
  );
}
