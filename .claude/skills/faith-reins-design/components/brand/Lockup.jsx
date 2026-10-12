import React from 'react';
import { HorseMark } from './HorseMark.jsx';

const SIZES = {
  xs: { stroke: 0.3, mark: 38, title: 18, track: '.22em', sub: 7.5, gap: 10, inner: 6, rule: 5, minRule: 10 },
  sm: { stroke: 0.35, mark: 44, title: 24, track: '.24em', sub: 9.5, gap: 14, inner: 6, rule: 8, minRule: 14 },
  md: { stroke: 0.5, mark: 84, title: 44, track: '.28em', sub: 11.5, gap: 22, inner: 9, rule: 12, minRule: 28 },
  lg: { stroke: 0.6, mark: 120, title: 64, track: '.28em', sub: 15.5, gap: 32, inner: 13, rule: 16, minRule: 40 },
};

// Tagline letter-spacing is fitted so tagline + both gold rules exactly match the wordmark width.
export function Lockup({ tone = 'light', size = 'md', mark = 'open', markColor, tagline = 'Pediatric & Equine Therapy', showTagline = true, assetBase = 'assets/logo/', style }) {
  const z = SIZES[size] || SIZES.md;
  const light = tone === 'light';
  const fg = light ? 'var(--fr-green)' : 'var(--fr-cream)';
  const sub = light ? 'var(--fr-gold-ink)' : 'var(--fr-gold-light)';
  const rule = light ? 'var(--fr-gold)' : 'var(--fr-gold-light)';
  const titleRef = React.useRef(null);
  const subRef = React.useRef(null);
  const [ls, setLs] = React.useState(z.sub * 0.3);
  React.useLayoutEffect(() => {
    if (!showTagline) return;
    const fit = () => {
      const t = titleRef.current, s = subRef.current;
      if (!t || !s) return;
      const prev = s.style.letterSpacing; s.style.letterSpacing = '0px';
      const w0 = s.offsetWidth; s.style.letterSpacing = prev;
      const avail = t.offsetWidth - 2 * (z.minRule + z.rule);
      const n = tagline.length;
      setLs(Math.max(0, Math.min(z.sub * 0.36, (avail - w0) / n)));
    };
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  }, [size, tagline, showTagline]);
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: z.gap, ...style }} aria-label="Faith Reins">
      {mark === 'disc' ? (
        <span style={{ width: Math.round(z.mark * 1.24), height: Math.round(z.mark * 1.24), borderRadius: '50%', background: light ? 'var(--fr-green)' : 'var(--fr-cream)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
          <HorseMark color={markColor || (light ? 'cream' : 'green')} height={Math.round(z.mark * 0.72)} assetBase={assetBase} style={{ marginLeft: -Math.round(z.mark * 0.05) }} />
        </span>
      ) : (
        <HorseMark color={markColor || (light ? 'green' : 'cream')} height={z.mark} assetBase={assetBase} />
      )}
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: z.inner }}>
        <span ref={titleRef} style={{ font: '400 ' + z.title + 'px/1 var(--font-serif)', letterSpacing: z.track, marginRight: '-' + z.track, color: fg, whiteSpace: 'nowrap', WebkitTextStroke: z.stroke + 'px currentColor', textRendering: 'geometricPrecision', WebkitFontSmoothing: 'antialiased', alignSelf: 'flex-start' }}>FAITH REINS</span>
        {showTagline ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: z.rule, width: '100%' }}>
            <span style={{ flex: 1, minWidth: z.minRule, borderTop: '1px solid ' + rule }} />
            <span ref={subRef} style={{ font: '600 ' + z.sub + 'px/1 var(--font-sans)', letterSpacing: ls + 'px', marginRight: -ls, textTransform: 'uppercase', color: sub, whiteSpace: 'nowrap' }}>{tagline}</span>
            <span style={{ flex: 1, minWidth: z.minRule, borderTop: '1px solid ' + rule }} />
          </span>
        ) : null}
      </div>
    </div>
  );
}
