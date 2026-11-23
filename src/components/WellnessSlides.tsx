'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { asset } from '../lib/site';

const slides = [
  { file: "horarios", description: "Horario de atención de Kineli. Lunes a viernes de 9:00 a 20:00 y sábado de 9:00 a 14:00." },
  { file: "presoterapia", description: "Presoterapia para piernas, abdomen y brazos." },
  { file: "recupera-movimiento", description: "Recupera tu movimiento. Evaluación y rehabilitación personalizada." },
  { file: "entrenamiento-guiado", description: "Entrena con orientación profesional. Kinesiólogo y técnico deportivo." },
  { file: "atencion-personalizada", description: "Tu cuerpo merece atención. Evaluación previa y atención personalizada." },
  { file: "consulta-kineli", description: "Estamos aquí para cuidarte. Agenda tu hora en Kineli." },
  { file: "apoyo-psicologico", description: "Pedir apoyo también es cuidarte. Un espacio para tu bienestar emocional." },
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
    <section className="wellness-slides" aria-label="Presentación de Kineli" onFocus={event => { if (event.target.matches(":focus-visible") && !event.currentTarget.contains(event.relatedTarget)) setPlaying(false); }}>
      <div className="wellness-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Imagen anterior">←</button>
        <button type="button" onClick={() => setPlaying(!playing)}>{playing ? 'Pausar' : 'Reproducir'}</button>
        <button type="button" onClick={() => move(1)} aria-label="Imagen siguiente">→</button>
        <span>{active + 1} / {slides.length}</span>
      </div>
      <div className="wellness-track">
        <Image className="wellness-neighbor" src={asset(`bienestar/${adjacent[0].file}.jpg`)} width={760} height={950} alt="" />
        <div aria-live={playing ? 'off' : 'polite'}>
          <Image key={slide.file} className="wellness-poster" src={asset(`bienestar/${slide.file}.jpg`)} width={760} height={950} alt={slide.description} loading={active === 0 ? 'eager' : undefined} />
        </div>
        <Image className="wellness-neighbor" src={asset(`bienestar/${adjacent[1].file}.jpg`)} width={760} height={950} alt="" />
      </div>
    </section>
  );
}
