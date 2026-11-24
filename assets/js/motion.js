/**
 * Animaciones e interaccion.
 *
 * Un solo sistema de entradas al scroll, contadores, barra de progreso
 * y el foco que sigue al cursor. Todo se apaga con "movimiento reducido".
 */

const $ = (selector, scope = document) =>
  Array.from(scope.querySelectorAll(selector));

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 1. Barra de progreso de lectura ---------- */

function initProgressBar() {
  const bar = document.querySelector('.progress');
  if (!bar) return;

  let ticking = false;

  const update = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = height > 0 ? Math.min(window.scrollY / height, 1) : 0;
    bar.style.transform = `scaleX(${ratio})`;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );

  update();
}

/* ---------- 2. Entradas al scroll ----------
   Retardos no uniformes: el ritmo se siente vivo, no mecanico. ---------- */

const REVEAL_GROUPS = [
  '.section__head',
  '.console',
  '.stack-grid',
  '.stack-col',
  '.timeline .tl',
  '.projects',
  '.project',
  '.contact > div',
  '.contact-list a',
];

function collectRevealTargets() {
  const seen = [];

  REVEAL_GROUPS.forEach((selector) => {
    $(selector).forEach((el) => {
      if (!seen.includes(el)) seen.push(el);
    });
  });

  seen.forEach((el) => el.classList.add('reveal'));
  return seen;
}

function staggerRevealTargets(targets) {
  targets.forEach((el) => {
    const siblings = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--d', `${Math.min(siblings, 5) * 65}ms`);
  });
}

function initScrollReveal() {
  const targets = collectRevealTargets();
  staggerRevealTargets(targets);

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });

      // Red de seguridad: lo que no se ha revelado a los 4 s se muestra igual
      targets.forEach((el) => {
        if (
          !el.classList.contains('is-in') &&
          el.getBoundingClientRect().top < window.innerHeight * 1.2
        ) {
          el.classList.add('is-in');
        }
      });
    },
    { threshold: 0.01, rootMargin: '0px 0px 12% 0px' }
  );

  targets.forEach((el) => observer.observe(el));

  // Fallback final: nada queda invisible por mucho que falle el observer
  setTimeout(() => {
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 1.5) {
        el.classList.add('is-in');
      }
    });
  }, 1600);
}

/* ---------- 3. Contadores de las metricas ---------- */

function prepareCounters() {
  $('.metric dd').forEach((dd) => {
    const textNode = dd.firstChild;
    if (!textNode || textNode.nodeType !== 3) return;

    const match = textNode.nodeValue.match(/^\s*(\d+)/);
    if (!match) return;

    const number = document.createElement('em');
    number.className = 'num';
    number.textContent = prefersReducedMotion() ? match[1] : '0';

    textNode.nodeValue = textNode.nodeValue.replace(/^\s*\d+/, '');
    dd.insertBefore(number, textNode);
    dd.setAttribute('data-to', match[1]);
  });
}

function animateCounter(dd) {
  const number = dd.querySelector('.num');
  const target = Number(dd.getAttribute('data-to'));
  let start = null;

  const step = (time) => {
    if (start === null) start = time;
    const progress = Math.min((time - start) / 1100, 1);
    number.textContent = Math.round(target * (1 - (1 - progress) ** 3));
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

function initCounters() {
  prepareCounters();

  const metrics = $('.metrics');

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    metrics.forEach((metric) => {
      $('dd[data-to]', metric).forEach((dd) => {
        dd.querySelector('.num').textContent = dd.getAttribute('data-to');
      });
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        setTimeout(() => {
          $('dd[data-to]', entry.target).forEach(animateCounter);
        }, 350);
      });
    },
    { threshold: 0.25 }
  );

  metrics.forEach((metric) => observer.observe(metric));

  // Red de seguridad: si el observer no dispara, el numero queda en su valor real
  setTimeout(() => {
    $('.metrics dd[data-to]').forEach((dd) => {
      const number = dd.querySelector('.num');
      if (number && number.textContent === '0') {
        number.textContent = dd.getAttribute('data-to');
      }
    });
  }, 2600);
}

/* ---------- 4. Foco de luz que sigue al cursor ---------- */

function initPointerGlow() {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (prefersReducedMotion() || !canHover) return;

  $('.project, .stack-col').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      el.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

export function initMotion() {
  initProgressBar();
  initScrollReveal();
  initCounters();
  initPointerGlow();
}
