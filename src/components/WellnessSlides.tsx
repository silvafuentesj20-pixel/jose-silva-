'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { asset } from '../lib/site';

const slides = [
  { file: 'cuerpo', description: 'Cuida tu cuerpo, cuida tu bienestar. Muévete, fortalece tu cuerpo y escucha las señales de dolor.' },
  { file: 'mente', description: 'Cuida tu mente, cuida tu vida. Descansa, habla sobre lo que sientes, pon límites saludables y busca apoyo profesional.' },
  { file: 'senales', description: 'Escucha las señales de tu cuerpo y tu mente, como el dolor persistente, el cansancio extremo, la ansiedad frecuente o los cambios de ánimo.' },
  { file: 'habitos', description: 'Pequeños hábitos, grandes cambios. Muévete, hidrátate, respira, descansa y conecta contigo.' },
  { file: 'conexion', description: 'Tu cuerpo y tu mente están conectados. Respira, duerme bien, muévete con regularidad y pide ayuda cuando la necesites.' },
];

export default function WellnessSlides() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const slide = slides[active];
  const adjacent = [-1, 1].map(offset => slides[(active + offset + slides.length) % slides.length]);

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setPlaying(!motion.matches);
    sync();
    motion.addEventListener('change', sync);
    return () => motion.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % slides.length), 7500);
    return () => window.clearInterval(timer);
  }, [playing]);

  function move(offset: number) {
    setPlaying(false);
    setActive(index => (index + offset + slides.length) % slides.length);
  }

  return (
    <section className="wellness-slides" aria-label="Consejos de bienestar de Kineli" onFocus={event => { if (event.target.matches(":focus-visible") && !event.currentTarget.contains(event.relatedTarget)) setPlaying(false); }}>
      <div className="wellness-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Imagen anterior">←</button>
        <button type="button" onClick={() => setPlaying(!playing)}>{playing ? 'Pausar' : 'Reproducir'}</button>
        <button type="button" onClick={() => move(1)} aria-label="Imagen siguiente">→</button>
        <span>{active + 1} / {slides.length}</span>
      </div>
      <div className="wellness-track">
        <Image className="wellness-neighbor" src={asset(`bienestar/${adjacent[0].file}.webp`)} width={760} height={950} alt="" />
        <div aria-live={playing ? 'off' : 'polite'}>
        <Image key={slide.file} className="wellness-poster" src={asset(`bienestar/${slide.file}.webp`)} width={760} height={950} alt={slide.description} loading={active === 0 ? 'eager' : undefined} />
        </div>
        <Image className="wellness-neighbor" src={asset(`bienestar/${adjacent[1].file}.webp`)} width={760} height={950} alt="" />
      </div>
    </section>
  );
}
