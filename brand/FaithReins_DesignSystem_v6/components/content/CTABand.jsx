import React from 'react';
import { useBreakpoint, gutter } from '../core/responsive.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';
import { Button } from '../core/Button.jsx';
import { TextLink } from '../core/TextLink.jsx';

export function CTABand({ tone = 'green', eyebrow, title, body, primaryLabel, onPrimary, secondaryLabel, onSecondary }) {
  const bp = useBreakpoint();
  const g = gutter(bp);
  const green = tone === 'green';
  const m = bp === 'mobile';
  return (
    <section style={{ background: green ? 'var(--fr-green)' : 'var(--fr-sand)', padding: (m ? 56 : 80) + 'px ' + g + 'px' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto', display: 'flex', flexDirection: bp === 'desktop' ? 'row' : 'column', alignItems: bp === 'desktop' ? 'center' : 'flex-start', justifyContent: 'space-between', gap: m ? 28 : 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
          {eyebrow ? <Eyebrow tone={green ? 'light' : 'dark'}>{eyebrow}</Eyebrow> : null}
          <h2 style={{ margin: 0, font: '400 ' + (m ? 30 : 40) + 'px/1.12 var(--font-serif)', color: green ? 'var(--fr-cream)' : 'var(--fr-green)', textWrap: 'balance' }}>{title}</h2>
          {body ? <p style={{ margin: 0, fontSize: m ? 16 : 17, lineHeight: 1.65, color: green ? 'var(--text-on-inverse-muted)' : 'var(--fr-muted)' }}>{body}</p> : null}
        </div>
        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 16 : 28, alignItems: m ? 'stretch' : 'center', width: m ? '100%' : 'auto', flex: 'none' }}>
          {primaryLabel ? <Button variant={green ? 'accent' : 'primary'} fullWidth={m} onClick={onPrimary}>{primaryLabel}</Button> : null}
          {secondaryLabel ? (m ? <Button variant={green ? 'outline-inverse' : 'outline'} fullWidth onClick={onSecondary}>{secondaryLabel}</Button> : <TextLink tone={green ? 'light' : 'dark'} onClick={onSecondary}>{secondaryLabel}</TextLink>) : null}
        </div>
      </div>
    </section>
  );
}
