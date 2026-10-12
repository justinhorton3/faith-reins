import React from 'react';

export function Checkbox({ label, checked, defaultChecked, onChange, name, style }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, font: '400 16px/1.4 var(--font-sans)', color: 'var(--fr-ink)', cursor: 'pointer', ...style }}>
      <input type="checkbox" name={name} checked={checked} defaultChecked={defaultChecked} onChange={onChange} style={{ width: 20, height: 20, margin: 0, accentColor: 'var(--fr-green)', flex: 'none' }} />
      {label}
    </label>
  );
}
