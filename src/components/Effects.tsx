'use client';

import { useEffect } from 'react';
import { motion, MotionConfig } from 'motion/react';

export function Effects() {
  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 760px)').matches) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference) and (min-width: 760px)', () => {
        document.querySelectorAll('[data-reveal]').forEach(element => {
          gsap.fromTo(element, { y: 12 }, { y: 0, duration: .55, clearProps: 'transform', scrollTrigger: { trigger: element, start: 'top 94%', once: true } });
        });
      });
      revert = () => media.revert();
    }).catch(() => {});
    return () => { disposed = true; revert?.(); };
  }, []);
  return null;
}

export function AgendaLink() {
  return <MotionConfig reducedMotion="user"><motion.a className="button primary" href="#reserva" whileTap={{ opacity: .84 }}>Agenda tu hora <span aria-hidden="true">↗</span></motion.a></MotionConfig>;
}
