# Kineli 3D

Prototipo independiente del sitio publicado. Usa Next.js App Router, TypeScript, Tailwind, React Three Fiber, Drei, GSAP, Motion, React Hook Form y Zod. El sitio se puede exportar como archivos estáticos.

## Arquitectura

```text
src/
  app/           Inicio, estilos, metadatos y aviso de privacidad
  components/    Escena 3D, alternativa estática, efectos y reserva
  lib/site.ts    Especialidades, equipo y enlaces editables
public/          Logo, afiche y fotografías ilustrativas
tests/           Flujo de reserva, axe-core y presupuesto móvil
```

La portada usa una escultura WebGL cargada después de detectar compatibilidad. En pantallas estrechas, dispositivos con puntero impreciso o movimiento reducido se muestra la versión estática. La navegación y el contenido no dependen de la escena. Se prescindió de Lenis para mantener el desplazamiento nativo.

## Instalar y ejecutar

Requiere Node.js 20.9 o posterior y npm.

```sh
npm ci
npm run dev
```

Abre la URL local que imprime Next.js. El formulario abre WhatsApp con la especialidad y, si se eligen, profesional y fecha preferida. El contacto se comparte al enviar desde WhatsApp y no se incluye en la URL. La solicitud no confirma disponibilidad.

## Compilar, probar y desplegar

```sh
npm run check
npm run build
npx playwright install chromium
npm test
```

Para usar Chrome ya instalado, ejecuta `PLAYWRIGHT_CHANNEL=chrome npm test`. La prueba móvil comprueba que la página no desborde ni abra WebGL en ese ancho, y limita el peso de los recursos cargados en la prueba local, con compresión gzip para HTML, CSS y JavaScript. Las cifras locales no se extrapolan a Core Web Vitals de producción.

Para previsualizar el export, ejecuta `node serve.mjs` y abre http://127.0.0.1:8743/.

Para desplegar, sube el contenido de `out/` a un alojamiento estático. Configura `NEXT_PUBLIC_SITE_URL` con la URL pública antes de compilar para activar indexación, URL canónica y datos estructurados. Para publicar en una subruta, configura también `NEXT_PUBLIC_BASE_PATH` (por ejemplo, `/jose-silva-`). Si GitHub Pages publica desde una rama, incluye también un archivo vacío `.nojekyll` para servir el directorio `_next`. Puedes configurar otro número con `NEXT_PUBLIC_WHATSAPP`, en formato internacional con solo dígitos.

El afiche y el logo provienen del sitio anterior. Las fotos de las especialidades son ilustrativas. El listado del equipo, los horarios, la dirección y el mapa están pendientes de confirmación. Con esos datos se podrá habilitar el SEO local para Limache y completar la sección de contacto.
