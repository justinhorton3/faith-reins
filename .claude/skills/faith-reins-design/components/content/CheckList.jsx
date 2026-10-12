import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';

export function CheckList({ items = [], columns = 1 }) {
  const bp = useBreakpoint();
  const n = bp === 'mobile' ? 1 : columns;
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(' + n + ', minmax(0,1fr))', gap: '18px 40px' }}>
      {items.map((it) => {
        const o = typeof it === 'string' ? { title: it } : it;
        return (
          <li key={o.title} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 14, alignItems: 'start' }}>
            <span aria-hidden="true" style={{ width: 7, height: 7, background: 'var(--fr-gold)', marginTop: o.body ? 10 : 9 }} />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ font: o.body ? '400 19px/1.35 var(--font-serif)' : '400 17px/1.55 var(--font-sans)', color: o.body ? 'var(--fr-green)' : 'var(--fr-ink)' }}>{o.title}</span>
              {o.body ? <span style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--fr-muted)' }}>{o.body}</span> : null}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
