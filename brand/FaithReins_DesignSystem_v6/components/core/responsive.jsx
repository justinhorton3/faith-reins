import React from 'react';

// mobile < 768 ≤ tablet < 1024 ≤ desktop
export function getBreakpoint(w) { return w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop'; }
// Provide a fixed width to render a subtree at a specific breakpoint (print sheets, side-by-side previews).
export const ViewportWidthContext = React.createContext(null);
export function useViewportWidth() {
  const forced = React.useContext(ViewportWidthContext);
  const [w, setW] = React.useState(typeof window === 'undefined' ? 1440 : window.innerWidth);
  React.useEffect(() => { const f = () => setW(window.innerWidth); window.addEventListener('resize', f); return () => window.removeEventListener('resize', f); }, []);
  return forced || w;
}
export function useBreakpoint() { return getBreakpoint(useViewportWidth()); }
export function gutter(bp) { return bp === 'mobile' ? 20 : bp === 'tablet' ? 40 : 64; }
export function sectionY(bp) { return bp === 'mobile' ? 64 : bp === 'tablet' ? 80 : 96; }
