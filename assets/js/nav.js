/**
 * Barra de navegacion: sombra al hacer scroll + seccion activa.
 */

export function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const links = Array.from(document.querySelectorAll('.nav__links a'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const update = () => {
    nav.classList.toggle('is-stuck', window.scrollY > 8);

    // Marca la seccion visible: la que ocupa el tercio superior
    const marker = window.scrollY + window.innerHeight * 0.32;
    let current = -1;

    sections.forEach((section, index) => {
      if (section.offsetTop <= marker) current = index;
    });

    links.forEach((link, index) => {
      link.classList.toggle('is-active', index === current);
      if (index === current) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}
