# Agencia Chucao

Sitio estático desarrollado con Astro para Agencia Chucao, agencia de marketing digital para negocios que quieren resultados reales. Santiago, Chile.

## Stack

- `Astro 6` con output estático
- `TypeScript`
- `@astrojs/sitemap` para generación de sitemap
- `Playwright` + `@axe-core/playwright` para testing de accesibilidad
- `@lhci/cli` para Lighthouse CI
- Fuentes: `JetBrains Mono`, `Lora`, `Montserrat` (via `@fontsource`)

## Requisitos

- `Node.js` compatible con las dependencias definidas en `package-lock.json`
- `npm`

## Comandos

| Comando                      | Descripción                                           |
| ---------------------------- | ----------------------------------------------------- |
| `npm install`                | Instala las dependencias del proyecto.                |
| `npm run dev`                | Levanta el entorno local de desarrollo.               |
| `npm run build`              | Genera la versión de producción en `dist/`.           |
| `npm run preview`            | Sirve localmente la compilación de producción.        |
| `npm run test:lighthouse`    | Ejecuta Lighthouse CI sobre `dist/`.                  |
| `npm run capture:local`      | Ejecuta capturas visuales con Playwright.             |
| `npm run capture:home`       | Ejecuta capturas visuales de la página de inicio.     |
| `npm run capture:blog`       | Ejecuta capturas visuales de páginas del blog.        |
| `npm run capture:servicios`  | Ejecuta capturas visuales de páginas de servicios.    |
| `npm run capture:portafolio` | Ejecuta capturas visuales de la página de portafolio. |

## Estructura del proyecto

```
src/
  pages/                    # Rutas del sitio
    blog/
      index.astro           # Listado de artículos del blog
      [slug].astro          # Página dinámica de detalle para artículos
    servicios/
      index.astro           # Listado de servicios
      *.astro               # Páginas individuales de servicios
    index.astro             # Página de inicio
    contacto.astro          # Página de contacto
    portafolio.astro        # Página de portafolio
    sobre-nosotros.astro    # Página sobre la agencia
    politica-de-cookies.astro # Página de política de cookies
    404.astro               # Página de error 404
  layouts/                  # Layouts compartidos
    BaseLayout.astro        # Layout base del sitio
    BlogPost.astro          # Layout para artículos de blog
  components/               # Componentes reutilizables de interfaz
    BlogCard.astro
    ContactForm.astro
    CookieConsent.astro
    Footer.astro
    Hero.astro
    Nav.astro
    PortfolioCard.astro
    SEO.astro
    ServiceCard.astro
    ServicePage.astro
    SocialShare.astro
    WhatsAppButton.astro
  content/blog/*.md         # Entradas del blog
  content.config.ts         # Esquema de la colección de contenido
  data/                     # Datos compartidos del sitio
    services.ts             # Definición de servicios
    portfolio.ts            # Definición de proyectos del portafolio
  styles/
    global.css              # Punto de entrada de estilos
    tokens.css              # Tokens de diseño
public/                     # Archivos estáticos publicados sin procesamiento
  fonts/                    # Fuentes estáticas
  images/                   # Imágenes estáticas
  favicon.ico
  robots.txt
  _headers
  _redirects
```

## Modelo de contenido

Cada artículo en `src/content/blog/` se define como un archivo Markdown con frontmatter. Desde ahí se generan los listados, las páginas de detalle y el contenido SEO.

Campos del esquema:

- `title` — Título del artículo
- `description` — Descripción para meta tags (máx. 160 caracteres)
- `publishDate` — Fecha de publicación
- `author` — Autor del artículo (por defecto: "Fabián")
- `service` — Categoría de servicio relacionada (`redes-sociales`, `seo`, `desarrollo-web`, `google-business`, `contenido`, `email-marketing`, `publicidad`, `default`)
- `tags` — Etiquetas adicionales (array, opcional)
- `heroImage` — Imagen principal del artículo (string, opcional)
- `relatedSlugs` — Slugs de artículos relacionados (array, opcional)

## Convenciones de assets

### Imágenes

- Usa `public/images/` para imágenes que no requieran procesamiento por Astro.
- Agrega texto alternativo significativo cuando el recurso aporte contenido.
- Las imágenes puramente decorativas pueden usar `alt=""`.

### Fuentes

- Las fuentes se cargan vía `@fontsource` desde `node_modules`.
- Fuentes adicionales o de respaldo pueden ubicarse en `public/fonts/`.

## Testing

El proyecto incluye tres capas de testing automatizado:

1. **Accesibilidad** — `tests/visual/a11y.spec.ts` escanea todas las páginas con axe-core buscando violaciones WCAG 2.1 AA.
2. **Capturas visuales** — `tests/visual/capture.spec.ts` genera screenshots full-page en 4 viewports (1440, 1200, 810, 390) para validación visual.
3. **Lighthouse CI** — `.lighthouserc.cjs` audita performance, accesibilidad, best practices y SEO contra umbrales definidos.

### Requisitos para tests

```powershell
npm install
npx playwright install chromium
```

### Ejecutar tests

```powershell
# Accesibilidad y capturas visuales (requiere build previo)
npm run build
npm run capture:local

# Lighthouse CI (requiere build previo)
npm run build
npm run test:lighthouse
```

## Flujo de trabajo recomendado

1. Instala dependencias con `npm install`.
2. Trabaja localmente con `npm run dev`.
3. Si cambias rutas, contenido o estilos, valida el resultado en navegador.
4. Antes de cerrar tu cambio, ejecuta `npm run build`.
5. Para cambios visibles, considera correr `npm run capture:local` y `npm run test:lighthouse`.

## Notas

- `dist/`, caches, logs, resultados de pruebas y otros archivos generados no forman parte de la fuente de verdad del proyecto.
- No subas secretos ni archivos `.env` reales al repositorio.
- El sitio está configurado en español de Chile (`lang="es-CL"`).
