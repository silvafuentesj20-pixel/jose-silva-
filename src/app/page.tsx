import Image from 'next/image';
import { asset, contact, faq, instagram, services, team } from '../lib/site';
import Booking from '../components/Booking';
import WellnessSlides from '../components/WellnessSlides';
import { AgendaLink, Effects } from '../components/Effects';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const specialtyCards = [
  ...services,
  { name: "Psicología", image: "psicologa-kineli.jpg", width: 576, height: 720, alt: "Retrato de una psicóloga de Kineli", description: "Atención psicológica individual para explorar lo que estás viviendo, comprender tus emociones y trabajar en objetivos acordados en consulta." },
];

export default function Home() {
  const schema = { '@context': 'https://schema.org', '@type': 'Organization', name: 'Kineli', url: siteUrl, logo: siteUrl ? new URL(asset('logo-kineli.png'), siteUrl).href : undefined, sameAs: [instagram] };
  return <>
    {siteUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />}
    <a className="skip" href="#contenido">Saltar al contenido</a>
    <header className="shell header">
      <a href="#inicio" className="brand"><Image src={asset('logo-kineli.png')} width={194} height={109} alt="Kineli, Centro de Rehabilitación y Bienestar" /></a>
      <p className="header-hours">
        <strong>Horario de atención</strong>
        <span>Lunes a viernes · 9:00 a 20:00</span>
        <span>Sábado · 9:00 a 14:00</span>
      </p>
      <nav aria-label="Navegación principal" className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <a href="#especialidades">Especialidades</a><a href="#equipo">Equipo</a><a href="#contacto">Contacto</a>
      </nav>
      <a className="button outline header-cta" href="#reserva">Agenda tu hora</a>
    </header>
    <main id="contenido">
      <section className="hero shell" id="inicio" aria-labelledby="hero-title">
        <div className="hero-welcome">
          <div className="welcome-sticker" aria-hidden="true">
            <Image src={asset('sticker-bienvenida.jpg')} width={366} height={440} alt="" />
            <div className="welcome-hand"><Image src={asset('sticker-bienvenida.jpg')} width={366} height={440} alt="" /></div>
          </div>
          <p>Bienvenido/a a Kineli</p>
        </div>
        <div className="hero-copy">
          <Image className="hero-background" src={asset('entrada-kineli.jpg')} alt="" fill sizes="(min-width: 1216px) 1180px, 100vw" />
          <p className="eyebrow"><span /> KINESIOLOGÍA Y PSICOLOGÍA</p>
          <h1 id="hero-title">Tu bienestar,<br /><em>nuestro compromiso.</em></h1>
          <p className="lead">Un espacio para cuidar el movimiento y la salud emocional. Conoce nuestras especialidades y consulta por una hora de atención.</p>
          <AgendaLink />
          <a className="scroll-link" href="#especialidades"><span aria-hidden="true">↓</span> Explora Kineli</a>
        </div>
        <div className="hero-service-logos">
          <Image src={asset('logo-kinesiologia.jpg')} width={192} height={192} alt="Kinesiología" />
          <Image src={asset('logo-psicologia.jpg')} width={192} height={192} alt="Psicología" />
          <Image src={asset('logo-quiropraxia.jpg')} width={192} height={192} alt="Quiropraxia" />
        </div>
        <WellnessSlides />
      </section>

      <section id="especialidades" className="shell section" data-reveal aria-labelledby="services-title">
        <p className="eyebrow"><span /> ESPECIALIDADES</p>
        <h2 id="services-title">Dos maneras de cuidarte</h2>
        <div className="grid items-start gap-5 md:grid-cols-2">
          {specialtyCards.map(service => <article className="service lift" key={service.image}>
            <div className="service-portrait"><Image src={asset(service.image)} alt={service.alt} width={service.width} height={service.height} /></div>
            <div className="card-copy"><p className="service-brand">Kineli</p><h3>{service.name}</h3><p>{service.description}</p></div>
          </article>)}
        </div>
      </section>

      <section className="band" id="equipo" aria-labelledby="team-title">
        <div className="shell section team" data-reveal>
          <div>
            <p className="eyebrow"><span /> EQUIPO</p>
            <h2 id="team-title">Conoce a Kineli</h2>
            {!!team.length ? <div className="grid gap-4 sm:grid-cols-2">
              {team.map(person => <article className="person lift" key={person.name}>
                <Image src={asset(person.photo)} width={260} height={260} alt={person.name} />
                <h3>{person.name}</h3><p>{person.credentials} · {person.specialty}</p>
              </article>)}
            </div> : <><p className="lead">El listado de profesionales, sus credenciales y especialidades está pendiente de confirmación.</p><a className="text-link" href={contact}>Consulta por el equipo ↗</a></>}
          </div>
          <figure className="poster"><Image src={asset('equipo-kineli-fondo.jpg')} width={1536} height={1024} alt="Foto grupal de los cinco integrantes del equipo de Kineli" sizes="(min-width: 1216px) 1180px, calc(100vw - 36px)" /></figure>
        </div>
      </section>

      <section className="shell section" aria-labelledby="process-title" data-reveal>
        <p className="eyebrow"><span /> PRIMERA CONSULTA</p>
        <h2 id="process-title">Cómo trabajamos</h2>
        <p className="muted process-note">Proceso orientativo, sujeto a confirmación del centro.</p>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="step lift"><h3>Evaluación</h3><p>Una primera conversación sobre lo que te trae a consulta.</p></article>
          <article className="step lift"><h3>Plan personalizado</h3><p>El profesional conversa contigo sobre objetivos y posibles pasos.</p></article>
          <article className="step lift"><h3>Acompañamiento</h3><p>El seguimiento se acuerda según tus necesidades y la atención indicada.</p></article>
        </div>
      </section>

      <section className="shell section booking" id="reserva" aria-labelledby="booking-title" data-reveal>
        <div>
          <p className="eyebrow"><span /> SOLICITUD DE ATENCIÓN</p>
          <h2 id="booking-title">Agenda tu hora</h2>
          <p className="lead">Indica tu especialidad y una fecha de preferencia. Podrás revisar el mensaje en WhatsApp antes de enviarlo.</p>
          <a className="text-link" href={contact}>Abrir WhatsApp directamente ↗</a>
        </div>
        <Booking />
      </section>

      <section className="shell section split" aria-labelledby="faq-title" id="preguntas" data-reveal>
        <h2 id="faq-title">Preguntas frecuentes</h2>
        <div className="faq">{faq.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="shell section split" id="contacto" aria-labelledby="contact-title">
        <div><p className="eyebrow"><span /> CONTACTO</p><h2 id="contact-title">Hablemos</h2></div>
        <div className="contact-card">
          <p><strong>Ubicación y horarios</strong><br />Encuentra Kineli en Google Maps. Consulta los horarios por WhatsApp.</p>
          <div className="flex flex-wrap gap-3"><a className="button primary" href="https://maps.app.goo.gl/pggUzWBdahCViAki7" target="_blank" rel="noopener">Cómo llegar en Google Maps ↗</a><a className="button outline" href={contact}>WhatsApp ↗</a><a className="button outline" href={instagram}>Instagram ↗</a></div>
        </div>
      </section>
      <div className="shell">
        <Image className="contact-map" src={asset('mapa-kineli.jpg')} width={900} height={1599} alt="Mapa de Centro Kineli en Av. Palmira Romano Sur 248, local 2, Strip Center Santa Cruz de Limache, frente a Ferretería Toso." />
      </div>
    </main>
    <footer><div className="shell footer"><strong>Kineli</strong><a href={asset('privacidad/')}>Aviso de privacidad</a><a href="#inicio">Volver arriba ↑</a></div></footer>
    <Effects />
  </>;
}
