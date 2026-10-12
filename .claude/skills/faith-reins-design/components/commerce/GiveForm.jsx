import React from 'react';
import { useBreakpoint } from '../core/responsive.jsx';
import { Button } from '../core/Button.jsx';
import { Checkbox } from '../forms/Checkbox.jsx';
import { TextField } from '../forms/TextField.jsx';

const FREQ = ['One-time', 'Monthly'];

export function GiveForm({ amounts = [25, 50, 100, 250], defaultFrequency = 'Monthly', onDonate }) {
  const bp = useBreakpoint();
  const [freq, setFreq] = React.useState(defaultFrequency);
  const [amt, setAmt] = React.useState(amounts[2] || amounts[0]);
  const [custom, setCustom] = React.useState(false);
  const [text, setText] = React.useState('');
  const [fee, setFee] = React.useState(true);
  const v = custom ? Number(text.replace(/[^0-9.]/g, '')) || 0 : amt;
  const total = fee ? Math.round(v * 102.9) / 100 : v;
  const money = (n) => '$' + (Number.isInteger(n) ? n : n.toFixed(2));
  const seg = (on) => ({ minHeight: 48, border: '1px solid var(--fr-green)', background: on ? 'var(--fr-green)' : 'transparent', color: on ? 'var(--fr-cream)' : 'var(--fr-green)', font: '600 12px/1 var(--font-sans)', letterSpacing: '.14em', textTransform: 'uppercase', cursor: 'pointer' });
  const tile = (on) => ({ minHeight: 56, border: '1px solid ' + (on ? 'var(--fr-green)' : 'var(--fr-line)'), background: on ? 'var(--fr-paper)' : 'transparent', boxShadow: on ? 'inset 0 0 0 1px var(--fr-green)' : 'none', color: 'var(--fr-green)', font: '400 22px/1 var(--font-serif)', cursor: 'pointer' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div role="group" aria-label="Gift frequency" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
        {FREQ.map((f) => <button key={f} type="button" aria-pressed={freq === f} onClick={() => setFreq(f)} style={seg(freq === f)}>{f}</button>)}
      </div>
      <div role="group" aria-label="Gift amount" style={{ display: 'grid', gridTemplateColumns: bp === 'mobile' ? '1fr 1fr' : 'repeat(' + (amounts.length + 1) + ', minmax(0,1fr))', gap: 10 }}>
        {amounts.map((a) => <button key={a} type="button" aria-pressed={!custom && amt === a} onClick={() => { setAmt(a); setCustom(false); }} style={tile(!custom && amt === a)}>{'$' + a}</button>)}
        <button type="button" aria-pressed={custom} onClick={() => setCustom(true)} style={{ ...tile(custom), font: '600 12px/1 var(--font-sans)', letterSpacing: '.14em', textTransform: 'uppercase', gridColumn: bp === 'mobile' ? '1 / -1' : 'auto' }}>Other</button>
      </div>
      {custom ? <TextField label="Other amount (USD)" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter an amount" /> : null}
      <Checkbox label="Add 2.9% so more of my gift goes to care" checked={fee} onChange={(e) => setFee(e.target.checked)} />
      <Button fullWidth disabled={!v} onClick={() => onDonate && onDonate({ amount: total, frequency: freq })}>{v ? 'Give ' + money(total) + (freq === 'Monthly' ? ' monthly' : '') : 'Choose an amount'}</Button>
      <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--fr-muted)' }}>You'll finish your gift on a secure checkout page. Faith Reins is a 501(c)(3); gifts are tax-deductible as allowed by law.</span>
    </div>
  );
}
