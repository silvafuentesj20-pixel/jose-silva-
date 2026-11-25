'use client';

import { useEffect } from 'react';
import { motion, MotionConfig } from 'motion/react';

export function Effects() {
  useEffect(() => {
    if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        document.querySelectorAll('[data-reveal]').forEach(element => {
          gsap.fromTo(element, { y: 28, opacity: .55 }, { y: 0, opacity: 1, duration: 3, ease: 'power2.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: element, start: 'top 96%', once: true } });
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
