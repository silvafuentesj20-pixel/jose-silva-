const visor = document.querySelector('.visor-galeria');
const fotos = [...visor.querySelectorAll('.diapositiva')];
const controles = visor.querySelector('.controles-galeria');
const pausa = controles.querySelector('[data-pausa]');
const movimientoReducido = matchMedia('(prefers-reduced-motion: reduce)');
let actual = 0;
let temporizador;

function mostrar(desplazamiento) {
  fotos[actual].classList.remove('activa');
  fotos[actual].setAttribute('aria-hidden', 'true');
  actual = (actual + desplazamiento + fotos.length) % fotos.length;
  fotos[actual].classList.add('activa');
  fotos[actual].removeAttribute('aria-hidden');
}

function reproducir() {
  temporizador = setInterval(() => mostrar(1), 4800);
  pausa.textContent = 'Pausar';
}

function detener() {
  clearInterval(temporizador);
  temporizador = undefined;
  pausa.textContent = 'Reproducir';
}

function avanzar(desplazamiento) {
  detener();
  mostrar(desplazamiento);
}

controles.querySelector('[data-anterior]').addEventListener('click', () => avanzar(-1));
controles.querySelector('[data-siguiente]').addEventListener('click', () => avanzar(1));
pausa.addEventListener('click', () => {
  if (temporizador) detener();
  else reproducir();
});
visor.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    avanzar(event.key === 'ArrowRight' ? 1 : -1);
  }
});

for (const foto of fotos.slice(1)) foto.setAttribute('aria-hidden', 'true');
controles.hidden = false;
if (movimientoReducido.matches) detener();
else reproducir();
movimientoReducido.addEventListener('change', event => {
  if (event.matches) detener();
});
