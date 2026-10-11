import React from 'react';
import { useBreakpoint, gutter } from '../core/responsive.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';
import { TextLink } from '../core/TextLink.jsx';

export function AudienceTiles({ items = [], onSelect, background }) {
  const bp = useBreakpoint();
  const g = gutter(bp);
  const d = bp === 'desktop';
  return (
    <div style={{ background, display: 'grid', gridTemplateColumns: d ? 'repeat(' + items.length + ', minmax(0,1fr))' : 'minmax(0,1fr)', borderTop: '1px solid var(--fr-line)', borderBottom: '1px solid var(--fr-line)' }}>
      {items.map((it, i) => (
        <div key={it.title} style={{ padding: d ? (i === 0 ? '44px 48px 44px ' + g + 'px' : '44px 48px') : '32px ' + g + 'px', borderRight: d && i < items.length - 1 ? '1px solid var(--fr-line)' : 0, borderBottom: !d && i < items.length - 1 ? '1px solid var(--fr-line)' : 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Eyebrow>{it.eyebrow}</Eyebrow>
          <span style={{ font: '400 ' + (bp === 'mobile' ? 24 : 28) + 'px/1.15 var(--font-serif)', color: 'var(--fr-green)' }}>{it.title}</span>
          <TextLink style={{ marginTop: 6 }} onClick={onSelect ? () => onSelect(it, i) : undefined}>{it.linkLabel}</TextLink>
        </div>
      ))}
    </div>
  );
}
