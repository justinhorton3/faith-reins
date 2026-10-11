import React from 'react';
import { Button } from '../core/Button.jsx';

export function GiftCallout({ title = 'Keep care close to home.', body = 'Your gift opens a spot for a child on our waiting list.', ctaLabel = 'Support', onCta, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 26, border: '1px solid var(--border-inverse-accent)', color: 'var(--fr-cream)', ...style }}>
      <span style={{ font: '400 24px/1.2 var(--font-serif)' }}>{title}</span>
      <span style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--text-on-inverse-muted)' }}>{body}</span>
      <Button variant="accent" size="sm" fullWidth onClick={onCta}>{ctaLabel}</Button>
    </div>
  );
}
