'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function HeroVisual() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 760px)');
    let frame = 0;
    function update() {
      cancelAnimationFrame(frame);
      if (!preference.matches) { setEnabled(false); return; }
      frame = requestAnimationFrame(() => {
        const canvas = document.createElement('canvas');
        try {
          const gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
          setEnabled(!!gl);
          gl?.getExtension('WEBGL_lose_context')?.loseContext();
        } catch { setEnabled(false); }
      });
    }
    update();
    preference.addEventListener('change', update);
    return () => { cancelAnimationFrame(frame); preference.removeEventListener('change', update); };
  }, []);

  return <div className="hero-visual" aria-hidden="true"><div className="sculpture"><i /><i /><i /></div>{enabled && <Scene />}</div>;
}
