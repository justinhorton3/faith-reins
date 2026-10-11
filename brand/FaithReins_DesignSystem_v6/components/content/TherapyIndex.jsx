import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';

function Row({ num, title, description, image, imagePosition = '50% 50%', onClick, bp }) {
  const [hover, setHover] = React.useState(false);
  const d = bp === 'desktop';
  const m = bp === 'mobile';
  const cols = d ? '56px 1.1fr 1.4fr 220px' : m ? '40px 1fr 24px' : '48px 1fr 140px';
  return (
    <div role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'grid', gridTemplateColumns: cols, gap: d ? 32 : m ? 12 : 24, alignItems: d ? 'center' : 'start', padding: (m ? 22 : 26) + 'px 0', borderBottom: '1px solid var(--fr-line)', cursor: onClick ? 'pointer' : 'default', background: hover && onClick ? 'rgba(231,224,210,.5)' : 'transparent', transition: 'background .15s ease' }}>
      <span style={{ font: '400 13px/1 var(--font-sans)', letterSpacing: '.08em', color: 'var(--fr-gold-ink)', paddingTop: d ? 0 : 8 }}>{num}</span>
      {d ? (
        <>
          <span style={{ font: '400 30px/1.15 var(--font-serif)', color: 'var(--fr-green)' }}>{title}</span>
          <span style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--fr-muted)' }}>{description}</span>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ font: '400 ' + (m ? 24 : 28) + 'px/1.15 var(--font-serif)', color: 'var(--fr-green)' }}>{title}</span>
          <span style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--fr-muted)' }}>{description}</span>
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'flex-end', paddingTop: m ? 6 : 0 }}>
        {image && !m ? <img src={image} alt="" loading="lazy" style={{ width: 140, height: 84, objectFit: 'cover', objectPosition: imagePosition }} /> : null}
        {d || m ? <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--fr-green)', transform: hover && onClick ? 'translateX(4px)' : 'none', transition: 'transform .15s ease' }}>→</span> : null}
      </div>
    </div>
  );
}

export function TherapyIndex({ items = [], onSelect }) {
  const bp = useBreakpoint();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--fr-green)' }}>
      {items.map((it, i) => <Row key={it.title} bp={bp} num={it.num || String(i + 1).padStart(2, '0')} {...it} onClick={onSelect ? () => onSelect(it, i) : undefined} />)}
    </div>
  );
}
