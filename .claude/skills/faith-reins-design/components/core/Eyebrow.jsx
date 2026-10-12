import React from 'react';

export function Eyebrow({ tone = 'dark', rule = false, tracking = '.26em', children, style }) {
  const c = tone === 'dark' ? 'var(--fr-gold-ink)' : 'var(--fr-gold-light)';
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 14, font: '600 11px/1 var(--font-sans)', letterSpacing: tracking, textTransform: 'uppercase', color: c, whiteSpace: 'nowrap', ...style }}>
      {rule ? <span style={{ width: 36, borderTop: '1px solid ' + c }} /> : null}
      {children}
    </span>
  );
}
