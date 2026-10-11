import React from 'react';
import { useBreakpoint, gutter } from '../core/responsive.jsx';

const DEFAULT = ['Licensed speech-language pathologists', 'Licensed occupational therapists', 'Licensed physical therapists', 'Licensed professional counselors', '501(c)(3) non-profit'];

export function CredentialStrip({ items = DEFAULT, tone = 'paper' }) {
  const bp = useBreakpoint();
  const g = gutter(bp);
  const m = bp === 'mobile';
  return (
    <div style={{ background: tone === 'green' ? 'var(--fr-green)' : 'var(--fr-paper)', borderBottom: '1px solid var(--fr-line)', padding: (m ? 20 : 22) + 'px ' + g + 'px' }}>
      <ul style={{ listStyle: 'none', margin: '0 auto', padding: 0, maxWidth: 1312, display: m ? 'grid' : 'flex', gridTemplateColumns: '1fr 1fr', flexWrap: 'wrap', justifyContent: 'space-between', gap: m ? '12px 16px' : '10px 28px' }}>
        {items.map((it) => (
          <li key={it} style={{ display: 'flex', alignItems: 'center', gap: 10, font: '600 ' + (m ? 10.5 : 11) + 'px/1.35 var(--font-sans)', letterSpacing: '.16em', textTransform: 'uppercase', color: tone === 'green' ? 'var(--fr-cream)' : 'var(--fr-green)' }}>
            <span aria-hidden="true" style={{ width: 6, height: 6, background: 'var(--fr-gold)', flex: 'none' }} />{it}
          </li>
        ))}
      </ul>
    </div>
  );
}
