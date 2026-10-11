import React from 'react';
import { useBreakpoint, gutter, sectionY } from '../core/responsive.jsx';

export function Split({ left, right, ratio = '1fr 1fr', gap = 72, align = 'start', stackAt = 'tablet' }) {
  const bp = useBreakpoint();
  const stack = bp === 'mobile' || (stackAt === 'tablet' && bp === 'tablet');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: stack ? 'minmax(0,1fr)' : ratio, gap: stack ? 40 : (bp === 'tablet' ? 40 : gap), alignItems: align }}>
      <div style={{ minWidth: 0 }}>{left}</div><div style={{ minWidth: 0 }}>{right}</div>
    </div>
  );
}
