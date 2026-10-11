import React from 'react';

export function TextField({ label, type = 'text', value, defaultValue, onChange, placeholder, required = false, help, error, multiline = false, rows = 5, name, style }) {
  const [focus, setFocus] = React.useState(false);
  const s = { width: '100%', minHeight: 48, padding: '12px 14px', borderRadius: 0, background: 'var(--fr-paper)', color: 'var(--fr-ink)', font: '400 16px/1.4 var(--font-sans)', outline: 'none', border: '1px solid ' + (error ? 'var(--fr-error)' : focus ? 'var(--fr-green)' : 'var(--fr-field-border)'), boxShadow: focus ? '0 0 0 2px var(--fr-gold-light)' : 'none', transition: 'border-color .15s ease, box-shadow .15s ease' };
  const p = { name, value, defaultValue, onChange, placeholder, required, onFocus: () => setFocus(true), onBlur: () => setFocus(false) };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <span style={{ font: '500 14px/1.3 var(--font-sans)', color: 'var(--fr-green)' }}>{label}{required ? <span style={{ color: 'var(--fr-gold-ink)', marginLeft: 3 }}>*</span> : null}</span>
      {multiline ? <textarea rows={rows} {...p} style={{ ...s, resize: 'vertical', minHeight: 120 }} /> : <input type={type} {...p} style={s} />}
      {error ? <span style={{ font: '400 14px/1.4 var(--font-sans)', color: 'var(--fr-error)' }}>{error}</span> : help ? <span style={{ font: '400 14px/1.4 var(--font-sans)', color: 'var(--fr-muted)' }}>{help}</span> : null}
    </label>
  );
}
