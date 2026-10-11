import React from 'react';
import { useBreakpoint, gutter, sectionY } from '../core/responsive.jsx';

const BG = { page: 'var(--fr-cream)', sand: 'var(--fr-sand)', paper: 'var(--fr-paper)', green: 'var(--fr-green)' };

export function Section({ tone = 'page', pad = 'default', id, maxWidth = 1312, children, style }) {
  const bp = useBreakpoint();
  const y = pad === 'none' ? 0 : pad === 'tight' ? Math.round(sectionY(bp) * 0.6) : sectionY(bp);
  return (
    <section id={id} style={{ background: BG[tone] || BG.page, color: tone === 'green' ? 'var(--fr-cream)' : 'var(--fr-ink)', padding: y + 'px ' + gutter(bp) + 'px', ...style }}>
      <div style={{ maxWidth, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: bp === 'mobile' ? 32 : 48 }}>{children}</div>
    </section>
  );
}
