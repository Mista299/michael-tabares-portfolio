/**
 * Selector de idioma ES/EN.
 *
 * El texto de cada elemento existe en el HTML como .lang-es y .lang-en;
 * este modulo solo muestra uno u otro y actualiza <html lang>.
 *
 * Prioridad: preferencia guardada > preferencia del navegador > español.
 */

const KEY = 'mt-lang';

const META = {
  es: {
    title: 'Michael Tabares Tobón — Backend y Cloud',
    desc: 'Practicante de Ingeniería de Sistemas. Backend en Java y Python, despliegue en VPS y cloud, Docker y Linux.',
  },
  en: {
    title: 'Michael Tabares Tobón — Backend & Cloud',
    desc: 'Systems Engineering intern. Backend in Java and Python, deployment to VPS and cloud, Docker and Linux.',
  },
};

export function applyLanguage(lang) {
  const root = document.documentElement;
  const buttons = document.querySelectorAll('.lang-switch button');
  const other = lang === 'en' ? 'es' : 'en';

  root.setAttribute('lang', lang);

  buttons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
  });

  // Marca la version oculta para lectores de pantalla y buscadores
  document.querySelectorAll('.lang-es, .lang-en').forEach((el) => {
    const isHidden = el.classList.contains(`lang-${other}`);
    el.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
  });

  // El boton de CV descarga la version del idioma activo
  document.querySelectorAll('[data-cv-es]').forEach((link) => {
    link.setAttribute('href', link.dataset[`cv${lang === 'en' ? 'En' : 'Es'}`]);
  });

  const meta = META[lang];
  document.title = meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', meta.desc);

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', meta.desc);

  try {
    localStorage.setItem(KEY, lang);
  } catch {
    // Modo privado o almacenamiento bloqueado: el idioma no se persiste.
  }
}

export function initLanguage() {
  const buttons = document.querySelectorAll('.lang-switch button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => applyLanguage(button.dataset.lang));
  });

  let saved = null;
  try {
    saved = localStorage.getItem(KEY);
  } catch {
    saved = null;
  }

  const preferred = (navigator.language || 'es').slice(0, 2).toLowerCase();
  applyLanguage(saved || (preferred === 'en' ? 'en' : 'es'));
}
