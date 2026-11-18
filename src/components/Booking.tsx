'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { asset, contact, services, team } from '../lib/site';

function today() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

const schema = z.object({
  specialty: z.string().refine(value => services.some(service => service.name === value), 'Elige una especialidad.'),
  professional: z.string().refine(value => !value || team.some(person => person.name === value), 'Elige un profesional del listado.'),
  date: z.string().refine(value => !value || (z.iso.date().safeParse(value).success && value >= today()), 'Elige hoy o una fecha futura.'),
  consent: z.boolean().refine(Boolean, 'Confirma que leíste el aviso para continuar.'),
});
type Request = z.infer<typeof schema>;

export default function Booking() {
  const { register, handleSubmit, formState: { errors } } = useForm<Request>({
    resolver: zodResolver(schema),
    defaultValues: { specialty: '', professional: '', date: '', consent: false },
  });

  function submit(request: Request) {
    const lines = [`Hola, Kineli. Quisiera consultar por una hora de ${request.specialty}.`];
    if (request.professional) lines.push(`Profesional de preferencia: ${request.professional}.`);
    if (request.date) lines.push(`Fecha de preferencia: ${request.date}.`);
    window.location.assign(`${contact}?text=${encodeURIComponent(lines.join('\n'))}`);
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="booking-form" noValidate>
      <label htmlFor="specialty">Especialidad</label>
      <select id="specialty" {...register('specialty')} required aria-invalid={!!errors.specialty} aria-describedby={errors.specialty ? 'specialty-error' : undefined}>
        <option value="">Elige una especialidad</option>
        {services.map(service => <option key={service.name}>{service.name}</option>)}
      </select>
      {errors.specialty && <p id="specialty-error" className="error" role="alert">{errors.specialty.message}</p>}
      {team.length > 0 && <>
        <label htmlFor="professional">Profesional (opcional)</label>
        <select id="professional" {...register('professional')} aria-invalid={!!errors.professional} aria-describedby={errors.professional ? 'professional-error' : undefined}>
          <option value="">Sin preferencia</option>
          {team.map(person => <option key={person.name}>{person.name}</option>)}
        </select>
        {errors.professional && <p id="professional-error" className="error" role="alert">{errors.professional.message}</p>}
      </>}
      <label htmlFor="preferred-date">Fecha preferida (opcional)</label>
      <input id="preferred-date" type="date" {...register('date')} aria-invalid={!!errors.date} aria-describedby={errors.date ? 'date-error' : undefined} />
      {errors.date && <p id="date-error" className="error" role="alert">{errors.date.message}</p>}
      <p className="muted">Tu número se comparte desde tu cuenta cuando envías el mensaje. La hora queda sujeta a confirmación de Kineli.</p>
      <label className="consent"><input type="checkbox" {...register('consent')} required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>Leí el <a href={asset('privacidad/')}>aviso de privacidad</a> y quiero continuar a WhatsApp.</span></label>
      {errors.consent && <p id="consent-error" className="error" role="alert">{errors.consent.message}</p>}
      <button className="button primary" type="submit">Continuar a WhatsApp <span aria-hidden="true">↗</span></button>
    </form>
  );
}
