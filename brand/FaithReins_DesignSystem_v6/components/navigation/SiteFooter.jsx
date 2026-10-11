import React from 'react';
import { useBreakpoint, gutter } from '../core/responsive.jsx';
import { Lockup } from '../brand/Lockup.jsx';
import { GiftCallout } from '../content/GiftCallout.jsx';

const DEFAULT_COLUMNS = [
  { title: 'Therapies', links: ['Speech & Language', 'Occupational', 'Physical', 'Counseling', 'Equine-Assisted'] },
  { title: 'Families', links: ['First visit', 'Payment & insurance', 'FAQ', 'Referring providers', 'Contact'] },
  { title: 'About', links: ['Our mission', 'Our team', 'Our horses', 'Partners', 'Careers'] },
];
const capsS = { font: '600 11px/1.3 var(--font-sans)', letterSpacing: '.16em', textTransform: 'uppercase' };

export function SiteFooter({ columns = DEFAULT_COLUMNS, blurb = 'A non-profit pediatric and equine therapy practice serving the children and families of South Arkansas.', phone = '(870) 555-0142', email = 'hello@faithreins.org', legal = ['Privacy policy', 'Accessibility', 'Donation policy'], onNavigate, onGive, assetBase = 'assets/logo/' }) {
  const bp = useBreakpoint();
  const g = gutter(bp);
  const link = (l) => <button key={l} type="button" onClick={() => onNavigate && onNavigate(l)} style={{ ...capsS, background: 'none', border: 0, padding: 0, minHeight: bp === 'desktop' ? 24 : 44, display: 'flex', alignItems: 'center', color: 'var(--fr-cream)', cursor: 'pointer', textAlign: 'left' }}>{l}</button>;
  const cols = bp === 'desktop' ? '1.6fr ' + columns.map(() => '1fr').join(' ') + ' 1.3fr' : bp === 'tablet' ? '1fr 1fr' : '1fr 1fr';
  return (
    <footer style={{ background: 'var(--fr-green)', color: 'var(--fr-cream)', padding: (bp === 'mobile' ? 56 : 80) + 'px ' + g + 'px 32px' }}>
      <div style={{ maxWidth: 1312, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: bp === 'mobile' ? 40 : 56 }}>
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: bp === 'mobile' ? '32px 20px' : 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, gridColumn: bp === 'desktop' ? 'auto' : '1 / -1' }}>
            <Lockup size="sm" tone="dark" assetBase={assetBase} />
            <span style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-on-inverse-muted)', maxWidth: 320 }}>{blurb}</span>
            <span style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--text-on-inverse-muted)' }}>{phone}<br />{email}</span>
          </div>
          {columns.map((c) => (
            <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: bp === 'desktop' ? 12 : 0, alignItems: 'flex-start' }}>
              <span style={{ ...capsS, color: 'var(--fr-gold-light)', letterSpacing: '.26em', marginBottom: bp === 'desktop' ? 4 : 8 }}>{c.title}</span>
              {c.links.map(link)}
            </div>
          ))}
          <GiftCallout onCta={onGive} style={{ gridColumn: bp === 'desktop' ? 'auto' : '1 / -1', alignSelf: 'start' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: bp === 'desktop' ? 'row' : 'column', justifyContent: 'space-between', gap: bp === 'desktop' ? 24 : 4, paddingTop: 24, borderTop: '1px solid var(--border-inverse)', ...capsS, fontSize: 11, letterSpacing: '.14em', color: 'rgba(243,238,228,.75)' }}>
          <span style={{ padding: bp === 'desktop' ? 0 : '12px 0' }}>501(c)(3) non-profit · South Arkansas</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: bp === 'desktop' ? 24 : '0 20px' }}>{legal.map((l) => <button key={l} type="button" onClick={() => onNavigate && onNavigate(l)} style={{ ...capsS, fontSize: 11, letterSpacing: '.14em', background: 'none', border: 0, padding: 0, minHeight: bp === 'desktop' ? 0 : 44, color: 'inherit', cursor: 'pointer' }}>{l}</button>)}</span>
          <span style={{ padding: bp === 'desktop' ? 0 : '12px 0' }}>© 2026 Faith Reins</span>
        </div>
      </div>
    </footer>
  );
}
