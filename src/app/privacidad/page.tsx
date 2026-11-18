import type { Metadata } from 'next';
import { asset, contact } from '../../lib/site';

export const metadata: Metadata = { title: 'Aviso de privacidad | Kineli', alternates: { canonical: './' } };

export default function Privacy() {
  return <main className="shell section privacy">
    <a className="text-link" href={asset('#reserva')}>← Volver a la solicitud</a>
    <h1>Aviso de privacidad</h1>
    <p>El formulario prepara un mensaje con tu especialidad y, si los seleccionas, el profesional y la fecha de preferencia. La web no almacena estas selecciones.</p>
    <p>Al continuar, WhatsApp recibe el texto preparado. Puedes revisarlo antes de enviarlo. Cuando envíes el mensaje, Kineli podrá ver tu contacto de WhatsApp para responder tu solicitud.</p>
    <p>Evita incluir diagnósticos, documentos u otros datos sensibles en el mensaje inicial. Puedes consultar tus dudas sobre el uso de datos con Kineli.</p>
    <a className="button primary" href={contact}>Contactar a Kineli ↗</a>
  </main>;
}
