/**
 * Punto de entrada del sitio.
 *
 * Cada modulo se ocupa de una pieza: el idioma, las animaciones y la
 * barra de navegacion. Se cargan como modulos ES nativos, sin bundler
 * ni dependencias.
 */

import { initLanguage } from './i18n.js';
import { initMotion } from './motion.js';
import { initNav } from './nav.js';

function init() {
  initLanguage();
  initMotion();
  initNav();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}
