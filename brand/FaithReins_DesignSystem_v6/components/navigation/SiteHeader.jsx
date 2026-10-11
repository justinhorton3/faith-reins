import React from 'react';
import { useViewportWidth, gutter, getBreakpoint } from '../core/responsive.jsx';
import { Lockup } from '../brand/Lockup.jsx';
import { Button } from '../core/Button.jsx';

const DEFAULT_LINKS = ['Therapies', 'For Families', 'For Providers', 'Our Horses', 'About', 'Shop'];
const DEFAULT_UTILITY = ['For Providers', 'Contact'];
const capsS = { font: '600 12px/1 var(--font-sans)', letterSpacing: '.16em', textTransform: 'uppercase', whiteSpace: 'nowrap' };

function NavLink({ label, active, light, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} aria-current={active ? 'page' : undefined}
      style={{ ...capsS, background: 'none', border: 0, padding: '0', minHeight: 44, cursor: 'pointer', color: light ? 'var(--fr-ink)' : 'var(--fr-cream)', borderBottom: '1px solid ' + (active || hover ? (light ? 'var(--fr-gold)' : 'var(--fr-gold-light)') : 'transparent') }}>
      {label}
    </button>
  );
}

function Bars({ open, color }) {
  const bar = (t) => ({ position: 'absolute', left: 0, width: 24, height: 1.5, background: color, transition: 'transform .2s ease, opacity .2s ease', ...t });
  return (
    <span aria-hidden="true" style={{ position: 'relative', display: 'block', width: 24, height: 16 }}>
      <span style={bar({ top: 0, transform: open ? 'translateY(7.25px) rotate(45deg)' : 'none' })} />
      <span style={bar({ top: 7.25, opacity: open ? 0 : 1 })} />
      <span style={bar({ top: 14.5, transform: open ? 'translateY(-7.25px) rotate(-45deg)' : 'none' })} />
    </span>
  );
}
const iconBtn = { width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, padding: 0, cursor: 'pointer', marginRight: -10 };

export function SiteHeader({ tone = 'light', links = DEFAULT_LINKS, utilityText = 'A non-profit serving South Arkansas families', utilityLinks = DEFAULT_UTILITY, showUtility = true, active, phone = '(870) 555-0142', ctaLabel = 'Support', onNavigate, onCta, onLogo, assetBase = 'assets/logo/', sticky = true }) {
  const w = useViewportWidth();
  const bp = getBreakpoint(w);
  const full = w >= 1280;
  const [open, setOpen] = React.useState(false);
  const light = tone === 'light';
  const fg = light ? 'var(--fr-ink)' : 'var(--fr-cream)';
  const nav = (l) => { setOpen(false); onNavigate && onNavigate(l); };
  return (
    <>
      {showUtility ? (
        <div style={{ background: light ? 'var(--fr-green)' : 'var(--fr-cream)', color: light ? 'var(--fr-cream)' : 'var(--fr-green)', borderBottom: light ? 0 : '1px solid var(--fr-line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: bp === 'mobile' ? 'center' : 'space-between', gap: 24, padding: '0 ' + gutter(bp) + 'px', minHeight: bp === 'mobile' ? 36 : 38, maxWidth: 1440, margin: '0 auto', font: '600 11px/1 var(--font-sans)', letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            {bp !== 'mobile' ? <span style={{ color: light ? 'var(--fr-gold-light)' : 'var(--fr-gold-ink)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{utilityText}</span> : null}
            <span style={{ display: 'flex', alignItems: 'center', gap: bp === 'mobile' ? 20 : 28 }}>
              {phone ? <a href={'tel:' + phone.replace(/[^0-9]/g, '')} style={{ color: 'inherit', textDecoration: 'none', minHeight: bp === 'mobile' ? 44 : 38, display: 'inline-flex', alignItems: 'center' }}>{phone}</a> : null}
              {(bp === 'desktop' ? utilityLinks : bp === 'mobile' ? utilityLinks.slice(-1) : []).map((l) => <button key={l} type="button" onClick={() => nav(l)} style={{ background: 'none', border: 0, padding: 0, minHeight: bp === 'mobile' ? 44 : 38, cursor: 'pointer', color: 'inherit', font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' }}>{l}</button>)}
            </span>
          </div>
        </div>
      ) : null}
    <header style={{ position: sticky ? 'sticky' : 'relative', top: 0, zIndex: 20, background: light ? 'var(--fr-cream)' : 'var(--fr-green)', borderBottom: light ? '1px solid var(--fr-field-border)' : '1px solid rgba(213,188,138,.35)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, padding: (bp === 'mobile' ? 12 : 20) + 'px ' + gutter(bp) + 'px', maxWidth: 1440, margin: '0 auto' }}>
        <button type="button" onClick={onLogo} aria-label="Faith Reins home" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center' }}>
          <Lockup size={bp === 'mobile' ? 'xs' : 'sm'} showTagline tone={light ? 'light' : 'dark'} assetBase={assetBase} />
        </button>
        {full ? (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ display: 'flex', gap: 30 }}>{links.map((l) => <NavLink key={l} label={l} light={light} active={active === l} onClick={() => nav(l)} />)}</div>
            <Button size="sm" variant={light ? 'primary' : 'accent'} onClick={onCta}>{ctaLabel}</Button>
          </nav>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {bp !== 'mobile' ? <Button size="sm" variant={light ? 'primary' : 'accent'} onClick={onCta}>{ctaLabel}</Button> : null}
            <button type="button" onClick={() => setOpen(true)} aria-expanded={open} aria-label="Open menu" style={iconBtn}><Bars color={light ? 'var(--fr-green)' : 'var(--fr-cream)'} /></button>
          </div>
        )}
      </div>
      {open && !full ? (
        <div style={{ position: 'fixed', inset: 0, zIndex: 30 }}>
          <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(14,32,25,.45)' }} />
          <div role="dialog" aria-label="Menu" style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 'min(400px, 100%)', background: 'var(--fr-cream)', padding: '12px ' + gutter(bp) + 'px 32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 68, marginBottom: 12 }}>
              <Lockup size="xs" assetBase={assetBase} />
              <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" style={iconBtn}><Bars open color="var(--fr-green)" /></button>
            </div>
            {links.map((l) => (
              <button key={l} type="button" onClick={() => nav(l)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 56, background: 'none', border: 0, borderBottom: '1px solid var(--fr-line)', padding: 0, cursor: 'pointer', font: '400 22px/1.2 var(--font-serif)', color: 'var(--fr-green)', textAlign: 'left' }}>
                {l}<span style={{ font: '600 14px var(--font-sans)', color: active === l ? 'var(--fr-gold)' : 'var(--fr-line)' }}>→</span>
              </button>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 32 }}>
              <Button fullWidth onClick={() => { setOpen(false); onCta && onCta(); }}>{ctaLabel}</Button>
              {phone ? <span style={{ ...capsS, letterSpacing: '.14em', color: 'var(--fr-ink)', textAlign: 'center', padding: '12px 0' }}>{phone}</span> : null}
            </div>
          </div>
        </div>
      ) : null}
    </header>
    </>
  );
}
