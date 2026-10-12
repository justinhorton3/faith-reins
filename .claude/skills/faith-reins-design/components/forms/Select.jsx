import React from 'react';

export function Select({ label, options = [], value, defaultValue, onChange, placeholder, required = false, help, error, name, style }) {
  const [focus, setFocus] = React.useState(false);
  const s = { ...{ width: '100%', minHeight: 48, padding: '12px 14px', borderRadius: 0, background: 'var(--fr-paper)', color: 'var(--fr-ink)', font: '400 16px/1.4 var(--font-sans)', outline: 'none', border: '1px solid ' + (error ? 'var(--fr-error)' : focus ? 'var(--fr-green)' : 'var(--fr-field-border)'), boxShadow: focus ? '0 0 0 2px var(--fr-gold-light)' : 'none', transition: 'border-color .15s ease, box-shadow .15s ease' }, appearance: 'none', WebkitAppearance: 'none', paddingRight: 40, cursor: 'pointer' };
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      <span style={{ font: '500 14px/1.3 var(--font-sans)', color: 'var(--fr-green)' }}>{label}{required ? <span style={{ color: 'var(--fr-gold-ink)', marginLeft: 3 }}>*</span> : null}</span>
      <span style={{ position: 'relative', display: 'block' }}>
        <select name={name} value={value} defaultValue={defaultValue ?? (placeholder ? '' : undefined)} onChange={onChange} required={required} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={s}>
          {placeholder ? <option value="" disabled>{placeholder}</option> : null}
          {options.map((o) => { const v = typeof o === 'string' ? o : o.value; const l = typeof o === 'string' ? o : o.label; return <option key={v} value={v}>{l}</option>; })}
        </select>
        <span aria-hidden="true" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--fr-green)', font: '400 12px var(--font-sans)' }}>▾</span>
      </span>
      {error ? <span style={{ font: '400 14px/1.4 var(--font-sans)', color: 'var(--fr-error)' }}>{error}</span> : help ? <span style={{ font: '400 14px/1.4 var(--font-sans)', color: 'var(--fr-muted)' }}>{help}</span> : null}
    </label>
  );
}
