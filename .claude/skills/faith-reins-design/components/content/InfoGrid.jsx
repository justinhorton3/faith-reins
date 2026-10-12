import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';
import { TextLink } from '../core/TextLink.jsx';

export function InfoGrid({ items = [], columns = 3, onSelect }) {
  const bp = useBreakpoint();
  const n = bp === 'mobile' ? 1 : bp === 'tablet' ? Math.min(2, columns) : columns;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + n + ', minmax(0,1fr))', gap: bp === 'mobile' ? 0 : '40px 32px' }}>
      {items.map((it, i) => (
        <div key={it.title} style={{ borderTop: '1px solid ' + (it.strong ? 'var(--fr-green)' : 'var(--fr-line)'), padding: bp === 'mobile' ? '24px 0 28px' : '24px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {it.eyebrow ? <Eyebrow>{it.eyebrow}</Eyebrow> : null}
          {it.meta ? <span style={{ font: '400 ' + (bp === 'mobile' ? 30 : 34) + 'px/1 var(--font-display)', color: 'var(--fr-gold-ink)' }}>{it.meta}</span> : null}
          <span style={{ font: '400 ' + (bp === 'mobile' ? 22 : 24) + 'px/1.2 var(--font-serif)', color: 'var(--fr-green)' }}>{it.title}</span>
          {it.body ? <span style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fr-muted)', textWrap: 'pretty' }}>{it.body}</span> : null}
          {it.linkLabel ? <TextLink style={{ marginTop: 4 }} onClick={onSelect ? () => onSelect(it, i) : undefined}>{it.linkLabel}</TextLink> : null}
        </div>
      ))}
    </div>
  );
}
