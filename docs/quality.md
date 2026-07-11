# Quality Contract — agenciachucao.cl

Este documento define las rutas representativas, comandos de verificación y expectativas de calidad para el sitio. Es el source of truth que `AGENTS.md` resume.

## Rutas representativas

Toda verificación de build, Lighthouse, accesibilidad y SEO se ejecuta al menos sobre:

| Ruta                    | Tipo                 | Qué validar                                                          |
| ----------------------- | -------------------- | -------------------------------------------------------------------- |
| `/`                     | Home                 | LCP, hero, CTA primario, `WebSite` structured data, contraste, focus |
| `/contacto/`            | Conversión principal | Formulario Web3Forms, layout sin CLS, consentimiento, eventos        |
| `/politica-de-cookies/` | Legal/contenido      | Tipografía, legibilidad, metadatos canónicos                         |
| `/404`                  | Error                | Página útil, status 404, CTA de WhatsApp                             |

## Objetivos de Lighthouse

- **Accessibility:** 100.
- **Best Practices:** 100.
- **SEO:** 100.
- **Performance:** se acepta `render-blocking-resources` como advertencia por el CSS crítico sincrónico. No se aceptan advertencias ni excepciones para `unused-css-rules`.

Se recomienda ejecutar al menos tres corridas por ruta en condiciones repetibles para exponer variabilidad natural, y documentar el método de agregación.

## Comandos de verificación

```bash
# Durante el trabajo
npm run format:check
npm run lint
npm run check
npm run build

# Tests mínimos relevantes según el cambio
npm run test:a11y
npm run test:build
npm run test:consent
npm run test:source

# Antes de entregar
npm run lint
npm run format:check
npm run check
npm run build
npm test
npm run test:lighthouse
```

## Presupuestos de recursos (orientativos)

- JavaScript crítico: solo lo necesario para consentimiento, navegación y métricas; evaluar antes de añadir islands.
- CSS: hojas sincrónicas limitadas a layout crítico; below-the-fold cargado lazy.
- Fuentes: subset latin; precargar solo la fuente LCP.
- Imágenes: dimensionadas, con `sizes` y formato moderno; LCP eager-loaded.
- Terceros: GTM/GA4 solo tras consentimiento; Web3Forms en `/contacto/`.

## Checklist de entrega

- [ ] Build pasa sin errores ni advertencias nuevas.
- [ ] Lint, format:check y check pasan.
- [ ] Todos los tests de Playwright y Vitest pasan.
- [ ] Lighthouse pasa en las rutas representativas sin excepciones no documentadas.
- [ ] `_headers`, `_redirects`, sitemap, robots y structured data están presentes y correctos.
- [ ] No hay PII en payloads de analytics ni eventos.
- [ ] No hay secretos, placeholders ni paths internos en el output.
- [ ] Los cambios no relacionados del working tree se preservaron.
- [ ] `AGENTS.md` y los docs relevantes se actualizaron si la decisión lo ameritaba.
