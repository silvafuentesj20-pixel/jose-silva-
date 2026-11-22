export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (name: string) => `${basePath}/${name}`;
export const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '56957375055';
export const contact = `https://wa.me/${whatsapp}`;
export const instagram = 'https://www.instagram.com/kineli.cl/';

export const services = [
  { name: 'Kinesiología', image: 'afiche-kinesiologia.webp', width: 520, height: 626, alt: 'Profesional de Kinesiología de Kineli', description: 'Un espacio para conversar sobre movilidad, función física y las actividades que quieres retomar.' },
  { name: 'Psicología', image: 'carlita-catalan.jpg', width: 540, height: 960, alt: 'Carlita Catalán, psicóloga de Kineli.', description: 'Un espacio de escucha para explorar emociones, vínculos y experiencias.' },
] as const;

export const team: { name: string; credentials: string; specialty: string; photo: string }[] = [];

export const faq = [
  ['¿Cómo solicito una hora?', 'Elige una especialidad y abre WhatsApp desde el formulario. El equipo puede confirmar disponibilidad directamente en el chat.'],
  ['¿Qué puedo preparar para la primera consulta?', 'Anota tus preguntas y lo que te gustaría conversar. Comparte tus antecedentes directamente con el profesional cuando corresponda.'],
  ['¿Puedo elegir profesional?', 'Puedes indicar una preferencia cuando se publique el listado confirmado del equipo.'],
];
