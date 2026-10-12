import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';

export function Testimonial({ quote, name, context, placeholder = false, align = 'center' }) {
  const bp = useBreakpoint();
  const c = align === 'center';
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 24, alignItems: c ? 'center' : 'flex-start', textAlign: c ? 'center' : 'left', maxWidth: 880, marginLeft: c ? 'auto' : 0, marginRight: c ? 'auto' : 0 }}>
      <span aria-hidden="true" style={{ font: '400 ' + (bp === 'mobile' ? 64 : 88) + 'px/0.6 var(--font-display)', color: 'var(--fr-gold)', height: bp === 'mobile' ? 28 : 40 }}>“</span>
      <blockquote style={{ margin: 0, font: 'italic 400 ' + (bp === 'mobile' ? 24 : bp === 'tablet' ? 30 : 34) + 'px/1.35 var(--font-serif)', color: placeholder ? 'var(--fr-muted)' : 'var(--fr-green)', textWrap: 'balance' }}>{quote}</blockquote>
      <figcaption style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: c ? 'center' : 'flex-start' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12, font: '600 11px/1 var(--font-sans)', letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--fr-gold-ink)' }}><span style={{ width: 28, borderTop: '1px solid var(--fr-gold)' }} />{name}</span>
        {context ? <span style={{ fontSize: 14, color: 'var(--fr-muted)' }}>{context}</span> : null}
        {placeholder ? <span style={{ font: '500 11px/1.3 ui-monospace, Menlo, monospace', color: 'var(--fr-muted)', background: 'var(--fr-paper)', border: '1px dashed var(--fr-field-border)', padding: '4px 8px', marginTop: 6 }}>Placeholder — replace with a real parent quote (with permission)</span> : null}
      </figcaption>
    </figure>
  );
}
