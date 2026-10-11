import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';

export function Steps({ items = [] }) {
  const bp = useBreakpoint();
  const row = bp === 'desktop';
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: row ? 'repeat(' + items.length + ', minmax(0,1fr))' : 'minmax(0,1fr)', gap: row ? 32 : 0, borderTop: row ? 0 : '1px solid var(--fr-green)' }}>
      {items.map((it, i) => (
        <li key={it.title} style={{ display: row ? 'flex' : 'grid', gridTemplateColumns: row ? undefined : '56px 1fr', flexDirection: 'column', gap: row ? 14 : 16, borderTop: row ? '1px solid var(--fr-green)' : 0, borderBottom: row ? 0 : '1px solid var(--fr-line)', padding: row ? '24px 0 0' : '24px 0' }}>
          <span style={{ font: '400 ' + (row ? 46 : 36) + 'px/1 var(--font-display)', color: 'var(--fr-gold)' }}>{String(i + 1)}</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ font: '400 ' + (bp === 'mobile' ? 22 : 24) + 'px/1.2 var(--font-serif)', color: 'var(--fr-green)' }}>{it.title}</span>
            <span style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--fr-muted)', textWrap: 'pretty' }}>{it.body}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
