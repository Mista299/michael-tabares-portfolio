# Sitio personal — Michael Tabares Tobón

Tarjeta de presentación personal. HTML, CSS y JavaScript planos: sin build,
sin dependencias, sin bundler.

```
pagina-web/
├── index.html                          ← estructura y contenido
├── assets/
│   ├── css/
│   │   └── main.css                    ← tokens, componentes, responsive
│   ├── js/
│   │   ├── main.js                     ← punto de entrada
│   │   ├── i18n.js                     ← selector de idioma ES/EN
│   │   ├── motion.js                   ← animaciones y contadores
│   │   └── nav.js                      ← barra de navegación
│   └── michael.jpg                     ← foto (recortada a cuadrada)
├── CV_Michael_Tabares_Tobon_v12_backend.pdf    ← descarga en español
├── CV_Michael_Tabares_Tobon_EN.pdf              ← descarga en inglés
├── CV_Michael_Tabares_Tobon_v12_datos_ml.pdf
├── CV_Michael_Tabares_Tobon_v12_seguridad.pdf
└── v1-anterior/index.html              ← versión previa, conservada
```

## Publicación

GitHub Pages sirve la rama `main` desde la raíz del repositorio. Cada `push`
a `main` vuelve a publicar el sitio: https://mista299.github.io/michael-tabares-portfolio/

Netlify y Vercel también funcionan: arrastra la carpeta o conecta el
repositorio apuntando a la raíz del proyecto.

## Ver en local

Los módulos ES (`import`/`export`) no funcionan abriendo el archivo con
`file://`: el navegador los bloquea por política de origen. Hay que servirlo
por HTTP:

```bash
cd pagina-web
python3 -m http.server 8000
# abre http://localhost:8000
```

Cualquier servidor estático sirve igual (`npx serve`, `php -S`, etc.).

## Idiomas

El sitio tiene versión **español** e **inglés**. El botón `ES | EN` de la barra
superior cambia el idioma, y la preferencia se guarda en `localStorage`, así que
se recuerda entre visitas. Si el visitante nunca ha elegido, se usa el idioma de
su navegador.

Cómo está hecho: cada bloque de texto tiene dos versiones marcadas con las
clases `lang-es` y `lang-en`. El CSS muestra una y oculta la otra según el
atributo `lang` del `<html>`; `assets/js/i18n.js` alterna ese atributo y
actualiza el título, las metaetiquetas de SEO y el enlace de descarga del CV.

Para **añadir un texto**, duplica el elemento con las dos clases:

```html
<span class="lang-es">Texto en español</span>
<span class="lang-en">Text in English</span>
```

Si solo existe en un idioma, escribe el texto directamente sin clases: se verá
igual en los dos.

## Editar

### Cambiar la foto

Reemplaza `assets/michael.jpg`. Idealmente cuadrada y con el rostro en el tercio
superior — el CSS recorta con `object-position:50% 30%`. Si tu recorte es
diferente, ajusta ese valor en `assets/css/main.css`.

### Cambiar el texto

Busca la sección en `index.html` por su `<h2>` (`Cómo trabajo`, `Stack`,
`Experiencia`, `Proyectos`, `Contacto`).

### Cambiar el CV que se descarga

El botón "Descargar CV" cambia solo: en español baja
`CV_Michael_Tabares_Tobon_v12_backend.pdf` y en inglés
`CV_Michael_Tabares_Tobon_EN.pdf`. Si reemplazas alguno, actualiza la ruta en
los atributos `data-cv-es` / `data-cv-en` del botón:

```html
<a class="btn" href="CV_Michael_Tabares_Tobon_v12_backend.pdf" download
   data-cv-es="CV_Michael_Tabares_Tobon_v12_backend.pdf"
   data-cv-en="CV_Michael_Tabares_Tobon_EN.pdf">
```

Las rutas son **relativas a propósito**: en GitHub Pages el sitio se sirve en
un subdirectorio, así que una ruta que empiece por `/` apuntaría a la raíz
del dominio y daría 404.

### Cambiar los colores

Todos están al inicio de `assets/css/main.css`, en el bloque `:root`:

```css
--cyan:   #35E0F0;   /* acento principal */
--amber:  #FFB84D;   /* etiquetas de proyecto */
--bg:     #05090F;   /* fondo */
```

## Nota de diseño

El mundo visual es **la sala de control de un servidor**: superficies oscuras,
un único acento que es la luz de un terminal en marcha, y la retícula de un
plano de racks.

- **Paleta:** azul profundo `#05090F` + cian `#35E0F0` + ámbar `#FFB84D` + verde de estado.
- **Tipografía:** Bricolage Grotesk para títulos (carácter geométrico con voz propia),
  Public Sans para texto, IBM Plex Mono para lo técnico (datos, comandos, rutas de archivo).
- **Sin frameworks ni librerías:** el sitio carga de inmediato.

### Movimiento

Cada animación responde a un porqué:

| Dónde | Qué hace | Por qué |
|---|---|---|
| Hero | "Backend y Cloud" seunderlinea con un barrido | El cursor de una terminal recorriendo la linea |
| Secciones | Entran al hacer scroll, escalonadas | Conectan la vista con el ritmo de lectura |
| Botones | `scale(.97)` al presionar | Confirma que la interfaz escucho el clic |
| Enlaces de proyecto | Se desplazan 3px al hover | Muestran que son accionables |
| Métricas | Los numeros cuentan hacia arriba | Revelan la escala del dato |
| Tarjetas | Un halo de luz sigue al puntero | Como el barrido de un sensor |

Todo se desactiva con `prefers-reduced-motion`, y hay redes de seguridad para
que ningun contenido quede invisible si el IntersectionObserver falla.

### Enlaces del portfolio

| Proyecto | En vivo | Código |
|---|---|---|
| Suite Nexus | suite.nexusbank.uk | github.com/Mista299 |
| Bookly | front-mph1.onrender.com/login | github.com/Mista299/Bookly-frontend |
| Olimpo Academia | olimpoacademia.com | github.com/Mista299/Olimpo-Academia-2.0 |
| Clasificador de Minerales | — | github.com/Mista299/clasificador-minerales-pdi-udea-2026-2 |
