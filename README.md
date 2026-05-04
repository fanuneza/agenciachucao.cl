# Agencia Chucao

Sitio estático desarrollado con Astro para Agencia Chucao. Lead Engine para clínicas dentales de alto ticket en Santiago, Chile.

## Stack

- `Astro 6` con output estático
- `TypeScript`
- `@astrojs/sitemap` para generación de sitemap
- `Playwright` + `@axe-core/playwright` para testing de accesibilidad
- `@lhci/cli` para Lighthouse CI
- Fuentes: `JetBrains Mono`, `Lora`, `Montserrat` (auto-hospedadas en `public/fonts/`)

## Requisitos

- `Node.js >=22` (ver `.nvmrc`)
- `npm`

## Comandos

| Comando               | Descripción                                        |
| --------------------- | -------------------------------------------------- |
| `npm install`         | Instala las dependencias del proyecto.             |
| `npm run dev`         | Levanta el entorno local de desarrollo.            |
| `npm run build`       | Genera la versión de producción en `dist/`.        |
| `npm run preview`     | Sirve localmente la compilación de producción.     |
| `npm run test:lighthouse` | Ejecuta Lighthouse CI sobre `dist/`.           |
| `npm run capture:local`   | Ejecuta capturas visuales con Playwright.      |
| `npm run capture:home`    | Capturas visuales de la página de inicio.      |
| `npm run capture:contacto`| Capturas visuales de la página de contacto.   |

## Estructura del proyecto

```
src/
  pages/
    index.astro             # Página principal (Lead Engine dental)
    contacto.astro          # Formulario de solicitud de auditoría
    politica-de-cookies.astro
    404.astro
  layouts/
    BaseLayout.astro        # Layout base con SEO, GA4, CookieConsent
  components/
    Nav.astro               # Navegación (wordmark + CTA)
    Footer.astro
    Hero.astro
    ProblemSection.astro    # La fuga: búsqueda → web → WhatsApp
    OfferSection.astro      # Los 6 componentes del Lead Engine
    HowItWorks.astro        # 4 pasos con señales de tiempo
    IncludesExcludes.astro  # Qué incluye y qué no
    PricingSection.astro    # Bandas de precios con ROI anchor
    FoundingOffer.astro     # 2 cupos fundadores
    FAQ.astro               # 5 preguntas y respuestas
    CTAFinal.astro          # CTA de cierre
    ContactForm.astro       # Formulario Web3Forms (4 campos)
    SEO.astro
    WhatsAppButton.astro
    CookieConsent.astro
  data/
    services.ts             # Componentes del Lead Engine (OfferComponent[])
  styles/
    global.css              # Estilos globales + utilidades
    tokens.css              # Design tokens (colores, tipografía, espaciado)
public/
  fonts/                    # Fuentes auto-hospedadas
  images/
    assets/                 # Logo y assets de marca
    og/                     # Imagen OG
  favicon.ico
  robots.txt
  _headers
  _redirects               # 301s para URLs eliminadas (blog, servicios, portafolio)
tests/
  visual/
    a11y.spec.ts            # WCAG 2.1 AA con axe-core
    capture.spec.ts         # Screenshots full-page en 4 viewports
.lighthouserc.cjs           # Umbrales de Lighthouse CI
```

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```
PUBLIC_WA_NUMBER=          # Número de WhatsApp sin +, sin espacios
PUBLIC_WEB3FORMS_KEY=      # Access key de Web3Forms
```

## Testing

1. **Accesibilidad** — `tests/visual/a11y.spec.ts` escanea todas las páginas con axe-core buscando violaciones WCAG 2.1 AA.
2. **Capturas visuales** — `tests/visual/capture.spec.ts` genera screenshots full-page en 4 viewports (1440, 1200, 810, 390).
3. **Lighthouse CI** — `.lighthouserc.cjs` audita `/` y `/contacto/` contra umbrales de performance, accesibilidad, best practices y SEO.

```powershell
npm install
npx playwright install chromium
npm run build
npx playwright test
```

## Flujo de trabajo

1. `npm install`
2. `npm run dev` para desarrollo local
3. `npm run build` antes de mergear
4. CI valida lint, formato, build, Lighthouse y Playwright automáticamente en cada push a `main`

## Notas

- `dist/`, caches, logs y resultados de pruebas no forman parte del repositorio (ver `.gitignore`).
- No subas secretos ni archivos `.env` reales al repositorio.
- El sitio está configurado en español de Chile (`lang="es-CL"`).
- La pauta publicitaria no está incluida en el fee — el cliente la paga directamente a Google.
