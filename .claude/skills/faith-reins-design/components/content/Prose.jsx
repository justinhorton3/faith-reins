import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';

export function Prose({ updated, sections = [] }) {
  const bp = useBreakpoint();
  return (
    <article style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 40 }}>
      {updated ? <span style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--fr-gold-ink)' }}>Last updated {updated}</span> : null}
      {sections.map((s) => (
        <section key={s.heading} style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--fr-line)', paddingTop: 24 }}>
          <h2 style={{ margin: 0, font: '400 ' + (bp === 'mobile' ? 24 : 28) + 'px/1.2 var(--font-serif)', color: 'var(--fr-green)' }}>{s.heading}</h2>
          {(s.paragraphs || []).map((p, i) => <p key={i} style={{ margin: 0, fontSize: 17, lineHeight: 1.7, color: 'var(--fr-ink)', textWrap: 'pretty' }}>{p}</p>)}
          {s.list ? <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 17, lineHeight: 1.6, color: 'var(--fr-ink)' }}>{s.list.map((l) => <li key={l}>{l}</li>)}</ul> : null}
        </section>
      ))}
    </article>
  );
}
