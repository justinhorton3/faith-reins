import React from 'react';

export function PhotoSlot({ label = 'Photo', ratio = '4 / 5', style }) {
  return (
    <div style={{ aspectRatio: ratio, width: '100%', background: 'repeating-linear-gradient(135deg, var(--fr-sand) 0 10px, #E1D9C9 10px 20px)', display: 'flex', alignItems: 'flex-end', padding: 14, ...style }}>
      <span style={{ font: '500 11px/1.3 ui-monospace, Menlo, monospace', letterSpacing: '.04em', color: 'var(--fr-muted)', background: 'var(--fr-paper)', padding: '4px 8px' }}>{label}</span>
    </div>
  );
}
