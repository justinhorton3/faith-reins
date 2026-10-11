import React from 'react';

const VARIANTS = {
  primary: { bg: 'var(--fr-green)', fg: 'var(--fr-cream)', bd: 'var(--fr-green)', hbg: 'var(--fr-green-deep)', hfg: 'var(--fr-cream)', hbd: 'var(--fr-green-deep)' },
  accent: { bg: 'var(--fr-gold)', fg: 'var(--fr-on-gold)', bd: 'var(--fr-gold)', hbg: 'var(--fr-gold-light)', hfg: 'var(--fr-on-gold)', hbd: 'var(--fr-gold-light)' },
  outline: { bg: 'transparent', fg: 'var(--fr-green)', bd: 'var(--fr-green)', hbg: 'var(--fr-green)', hfg: 'var(--fr-cream)', hbd: 'var(--fr-green)' },
  'outline-inverse': { bg: 'transparent', fg: 'var(--fr-cream)', bd: 'var(--fr-cream)', hbg: 'var(--fr-cream)', hfg: 'var(--fr-green)', hbd: 'var(--fr-cream)' },
};
const SIZES = { sm: '14px 24px', md: '17px 28px' };

export function Button({ variant = 'primary', size = 'md', href, onClick, disabled = false, fullWidth = false, type = 'button', children, style }) {
  const [hover, setHover] = React.useState(false);
  const v = VARIANTS[variant] || VARIANTS.primary;
  const on = hover && !disabled;
  const s = {
    display: fullWidth ? 'flex' : 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: fullWidth ? '100%' : undefined, padding: SIZES[size] || SIZES.md,
    font: '600 12px/1 var(--font-sans)', letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', textDecoration: 'none',
    background: on ? v.hbg : v.bg, color: on ? v.hfg : v.fg, border: '1px solid ' + (on ? v.hbd : v.bd), borderRadius: 0,
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
    transition: 'background .15s ease, color .15s ease, border-color .15s ease', ...style,
  };
  const p = { style: s, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false) };
  if (href && !disabled) return <a href={href} onClick={onClick} {...p}>{children}</a>;
  return <button type={type} onClick={onClick} disabled={disabled} {...p}>{children}</button>;
}
