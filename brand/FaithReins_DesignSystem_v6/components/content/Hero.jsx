import React from 'react';
import { useBreakpoint, gutter } from '../core/responsive.jsx';
import { Eyebrow } from '../core/Eyebrow.jsx';
import { Button } from '../core/Button.jsx';
import { TextLink } from '../core/TextLink.jsx';

const H = { home: { desktop: 'clamp(560px,72vh,800px)', tablet: 640, mobile: 620 }, page: { desktop: 420, tablet: 400, mobile: 440 } };
const T = { home: { desktop: 86, tablet: 64, mobile: 44 }, page: { desktop: 58, tablet: 48, mobile: 36 } };

export function Hero({ image, mobileImage, imagePosition = 'center', mobileImagePosition, eyebrow, title, lead, primaryLabel, onPrimary, primaryVariant = 'accent', secondaryLabel, onSecondary, size = 'home', height }) {
  const bp = useBreakpoint();
  const m = bp === 'mobile';
  const src = m && mobileImage ? mobileImage : image;
  const g = gutter(bp);
  return (
    <section style={{ position: 'relative', height: height || H[size][bp], overflow: 'hidden', background: 'var(--fr-green)' }}>
      {src ? <img src={src} alt="" fetchpriority="high" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: (m && mobileImagePosition) || imagePosition }} /> : null}
      <div style={{ position: 'absolute', inset: 0, background: m ? 'linear-gradient(180deg, rgba(14,32,25,.1) 0%, rgba(14,32,25,.55) 40%, rgba(14,32,25,.9) 100%)' : 'var(--overlay-hero)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: m ? 'flex-end' : 'center', gap: m ? 18 : 28, padding: m ? '0 ' + g + 'px 32px' : '0 ' + g + 'px', maxWidth: bp === 'desktop' ? 760 + g : 640 + g, color: 'var(--fr-cream)' }}>
        {eyebrow ? <Eyebrow tone="light" rule tracking={m ? '.22em' : '.3em'}>{eyebrow}</Eyebrow> : null}
        <h1 style={{ margin: 0, font: '400 ' + T[size][bp] + 'px/1.02 var(--font-display)', textWrap: 'balance' }}>{title}</h1>
        {lead ? <p style={{ margin: 0, font: '400 ' + (m ? 17 : 20) + 'px/1.6 var(--font-serif)', color: 'rgba(243,238,228,.9)', maxWidth: 540 }}>{lead}</p> : null}
        {primaryLabel || secondaryLabel ? (
          <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 16 : 28, alignItems: m ? 'stretch' : 'center', paddingTop: m ? 4 : 8 }}>
            {primaryLabel ? <Button variant={primaryVariant} fullWidth={m} onClick={onPrimary}>{primaryLabel}</Button> : null}
            {secondaryLabel ? (m ? <Button variant="outline-inverse" fullWidth onClick={onSecondary}>{secondaryLabel}</Button> : <TextLink tone="light" onClick={onSecondary}>{secondaryLabel}</TextLink>) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
