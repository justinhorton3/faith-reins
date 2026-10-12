import React from 'react';

export function HorseMark({ color = 'green', height = 44, assetBase = 'assets/logo/', alt = '', style }) {
  return <img src={assetBase + 'horse-mark-' + color + '.png'} alt={alt} style={{ height, width: 'auto', display: 'block', ...style }} />;
}
