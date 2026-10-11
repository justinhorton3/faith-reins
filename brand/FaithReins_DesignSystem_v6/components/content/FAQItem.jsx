import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';

export function FAQItem({ question, children, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const bp = useBreakpoint();
  return (
    <div style={{ borderBottom: '1px solid var(--fr-line)' }}>
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}
        style={{ width: '100%', minHeight: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: (bp === 'mobile' ? 18 : 22) + 'px 0', background: 'none', border: 0, cursor: 'pointer', textAlign: 'left', font: '400 ' + (bp === 'mobile' ? 19 : 22) + 'px/1.3 var(--font-serif)', color: 'var(--fr-green)' }}>
        {question}
        <span aria-hidden="true" style={{ font: '400 24px/1 var(--font-sans)', color: 'var(--fr-gold)', flex: 'none', width: 24, textAlign: 'center' }}>{open ? '−' : '+'}</span>
      </button>
      {open ? <div style={{ padding: '0 0 24px', fontSize: 16, lineHeight: 1.65, color: 'var(--fr-muted)', maxWidth: 720 }}>{children}</div> : null}
    </div>
  );
}

export function FAQList({ items = [], defaultOpenFirst = false }) {
  return (
    <div style={{ borderTop: '1px solid var(--fr-green)' }}>
      {items.map((it, i) => <FAQItem key={it.q} question={it.q} defaultOpen={defaultOpenFirst && i === 0}>{it.a}</FAQItem>)}
    </div>
  );
}
