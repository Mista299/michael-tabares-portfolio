# Sitio personal — Michael Tabares Tobón

Tarjeta de presentación personal. Un solo archivo HTML, sin build, sin dependencias.

```
pagina-web/
├── index.html                          ← todo el sitio (HTML + CSS + JS inline)
├── assets/
│   └── michael.jpg                     ← tu foto (recortada a cuadrada)
├── CV_Michael_Tabares_Tobon_v12_backend.pdf    ← descarga en español
├── CV_Michael_Tabares_Tobon_EN.pdf              ← descarga en inglés
├── CV_Michael_Tabares_Tobon_v12_datos_ml.pdf
└── CV_Michael_Tabares_Tobon_v12_seguridad.pdf
```

## Idiomas

El sitio tiene versión **español** e **inglés**. El botón `ES | EN` de la barra
superior cambia el idioma, y la preferencia se guarda en `localStorage`, así que
se recuerda entre visitas. Si el visitante nunca ha elegido, se usa el idioma de
su navegador.

Cómo está hecho: cada bloque de texto tiene dos versiones marcadas con las
clases `lang-es` y `lang-en`. El CSS muestra una y oculta la otra según el
atributo `lang` del `<html>`; el JavaScript alterna ese atributo y actualiza el
título y las metaetiquetas de SEO.

Para **añadir un texto**, duplica el elemento con las dos clases:

```html
<span class="lang-es">Texto en español</span>
<span class="lang-en">Text in English</span>
```

Si solo existe en un idioma, escribe el texto directamente sin clases: se verá
igual en los dos.

## Ver en local

```bash
cd pagina-web
python3 -m http.server 8000
# abre http://localhost:8000
```

## Editar

Todo está en `index.html`. Para cambiar textos, busca la sección por su `<h2>`
(`Cómo trabajo`, `Stack`, `Experiencia`, `Proyectos`, `Contacto`).

### Cambiar la foto

Reemplaza `assets/michael.jpg`. Idealmente cuadrada y con el rostro en el tercio
superior — el CSS recorta con `object-position:50% 30%`. Si tu recorte es
diferente, ajusta ese valor.

### Poner la URL real de Bookly

En el proyecto **Bookly**, busca este comentario:

```html
<!-- ═══ EDITAR ═══ Reemplazar el href="#" por la URL real de producción de Bookly -->
```

y cambia `href="#"` por tu URL, por ejemplo `href="https://bookly-xxxx.onrender.com"`.

### Cambiar el CV que se descarga

El botón "Descargar CV" cambia solo: en español baja `CV_Michael_Tabares_Tobon_v12_backend.pdf`
y en inglés `CV_Michael_Tabares_Tobon_EN.pdf`. Si reemplazas alguno, actualiza la
ruta en el atributo `data-cv-es` / `data-cv-en` del botón:

```html
<a class="btn" href="/CV_Michael_Tabares_Tobon_v12_backend.pdf" download
   data-cv-es="/CV_Michael_Tabares_Tobon_v12_backend.pdf"
   data-cv-en="/CV_Michael_Tabares_Tobon_EN.pdf">
```

### Cambiar los colores

Todos están al inicio del `<style>`, en el bloque `:root`:

```css
--cyan:   #2DD4E8;   /* acento principal */
--amber:  #F0A830;   /* etiquetas de proyecto */
--bg:     #070C16;   /* fondo */
```

## Publicar

Cualquier hosting estático sirve. Netlify y Vercel: arrastra la carpeta `pagina-web`
o conéctala a un repositorio y publica la raíz en esa carpeta. GitHub Pages también
funciona: sube la carpeta como `docs/` o `gh-pages`.

Para un dominio propio, apunta un CNAME al hosting.

## Nota de diseño

El mundo visual es **la sala de control de un servidor**: superficies oscuras,
un único acento que es la luz de un terminal en marcha, y la retícula de un
plano de racks.

- **Paleta:** azul profundo `#05090F` + cian `#35E0F0` + ámbar `#FFB84D` + verde de estado.
- **Tipografía:** Bricolage Grotesk para títulos (carácter geométrico con voz propia),
  Public Sans para texto, IBM Plex Mono para lo técnico (datos, comandos, rutas de archivo).
- **Sin frameworks ni librerías:** el archivo pesa menos de 60 KB y carga de inmediato.

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
