import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';
import { Button } from '../core/Button.jsx';

export function ProductCard({ image, name, price, sizes, fit, sizeGuide, onAdd }) {
  const bp = useBreakpoint();
  const [size, setSize] = React.useState(sizes && sizes.length ? sizes[0] : null);
  const [added, setAdded] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ aspectRatio: '1 / 1', background: 'var(--fr-paper)', border: '1px solid var(--fr-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {image ? <img src={image} alt={name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
      </div>
      {fit ? <span style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--fr-gold-ink)', marginBottom: -6 }}>{fit}</span> : null}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
        <span style={{ font: '400 ' + (bp === 'mobile' ? 19 : 20) + 'px/1.25 var(--font-serif)', color: 'var(--fr-green)' }}>{name}</span>
        <span style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--fr-gold-ink)', whiteSpace: 'nowrap' }}>{price}</span>
      </div>
      {sizes && sizes.length ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }} role="group" aria-label="Size">
          {sizes.map((s) => <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)} style={{ minWidth: 44, minHeight: 44, padding: '0 10px', border: '1px solid ' + (size === s ? 'var(--fr-green)' : 'var(--fr-field-border)'), background: size === s ? 'var(--fr-green)' : 'transparent', color: size === s ? 'var(--fr-cream)' : 'var(--fr-ink)', font: '600 12px/1 var(--font-sans)', letterSpacing: '.08em', cursor: 'pointer' }}>{s}</button>)}
        </div>
      ) : null}
      {sizeGuide ? <span style={{ fontSize: 13, color: 'var(--fr-muted)', marginTop: -4 }}>{sizeGuide}</span> : null}
      <Button variant="outline" size="sm" fullWidth onClick={() => { setAdded(true); onAdd && onAdd({ name, price, size }); setTimeout(() => setAdded(false), 1600); }}>{added ? 'Added to cart' : 'Add to cart'}</Button>
    </div>
  );
}
