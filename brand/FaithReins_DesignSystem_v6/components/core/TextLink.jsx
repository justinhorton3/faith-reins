import React from 'react';

export function TextLink({ href, onClick, tone = 'dark', arrow = false, children, style }) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === 'dark';
  const s = {
    display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
    font: '600 12px/1 var(--font-sans)', letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none', cursor: 'pointer',
    color: hover ? (dark ? 'var(--fr-gold-ink)' : 'var(--fr-gold-light)') : (dark ? 'var(--fr-green)' : 'var(--fr-cream)'),
    borderBottom: '1px solid ' + (dark ? 'var(--fr-gold)' : 'var(--fr-gold-light)'), paddingBottom: 5,
    background: 'none', borderTop: 0, borderLeft: 0, borderRight: 0, paddingLeft: 0, paddingRight: 0, paddingTop: 0,
    transition: 'color .15s ease', ...style,
  };
  const content = <>{children}{arrow ? <span aria-hidden="true">→</span> : null}</>;
  const p = { style: s, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), onClick };
  return href ? <a href={href} {...p}>{content}</a> : <button type="button" {...p}>{content}</button>;
}
