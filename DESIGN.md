---
name: Agencia Chucao
description: Sistema de agendamientos para clínicas dentales en Santiago.
colors:
  vermilion: "#d24a2a"
  vermilion-dark: "#b83d1f"
  bone: "#f2eee6"
  bone-2: "#e8e2d4"
  bone-line: "#d9d2c0"
  ink: "#0e0e0c"
  ink-2: "#1a1a17"
  ink-line: "#2a2a24"
  graphite: "#4a4943"
  muted: "#7a7770"
  muted-dark: "#c8c3b6"
  white: "#ffffff"
  wa: "#2bb36b"
typography:
  display:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 6vw + 1rem, 6.75rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.4vw + 0.5rem, 4.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.4vw + 1.2rem, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Montserrat, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: '"JetBrains Mono", ui-monospace, "SF Mono", menlo, monospace'
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  none: "0"
spacing:
  gutter: "clamp(1.25rem, 2vw, 2rem)"
  section-y: "clamp(4rem, 7vw, 7rem)"
components:
  button-primary:
    backgroundColor: "{colors.vermilion}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.4rem"
  button-primary-hover:
    backgroundColor: "{colors.vermilion-dark}"
    textColor: "{colors.bone}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.4rem"
  button-secondary-dark:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.1rem"
  button-ghost-dark:
    backgroundColor: "transparent"
    textColor: "{colors.bone}"
  form-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1rem"
  form-field-focus:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
  nav:
    backgroundColor: "rgba(242, 238, 230, 0.92)"
    textColor: "{colors.ink}"
  cookie-banner:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.muted-dark}"
---

# Design System: Agencia Chucao

## 1. Overview

**Creative North Star: "La ficha de la clínica"**

Un sistema visual que se comporta como una ficha de clínica bien ordenada: datos claros, jerarquía explícita, nada de adorno. La estética es cálida y clínica al mismo tiempo: la calidez viene del tono humano y de los colores terrosos; la precisión viene de la tipografía sans estructurada y de los bordes nítidos. Rechaza activamente el look de agencia de marketing genérica (fondos crema genéricos, iconos de cohete, jerga en inglés) y el azul clínico cliché.

**Key Characteristics:**

- Fondo claro con acento rojo terracota; secciones oscuras para contraste y descanso visual.
- Tipografía sans moderna (Montserrat) para todo; JetBrains Mono solo para etiquetas y metadatos.
- Layout basado en grillas y bordes de 1px; sin radii, sin sombras decorativas.
- Fotografía real de clínicas y reportes; nada de ilustraciones genéricas.
- Espaciado amplio y ritmo marcado por secciones.

## 2. Colors

El palette es reducido: un acento cálido, una familia de neutros terrosos y una familia de tintas. No hay segundo acento saturado.

### Primary

- **Señal cálida** (`#d24a2a`): acento principal. Usado en CTAs, estados de foco, énfasis y puntos de ancla visual. Debe ocupar ≤10% de la superficie.
- **Señal cálida oscura** (`#b83d1f`): estado hover/active del acento.

### Neutral

- **Hueso** (`#f2eee6`): fondo de body. Cálido pero contenido; no es el beige genérico de agencia.
- **Hueso 2** (`#e8e2d4`): superficies secundarias, cajas de énfasis.
- **Línea hueso** (`#d9d2c0`): bordes y divisores sobre fondo claro.
- **Tinta** (`#0e0e0c`): texto principal y fondos oscuros.
- **Tinta 2** (`#1a1a17`): superficies elevadas sobre fondo oscuro.
- **Línea tinta** (`#2a2a24`): bordes sobre fondo oscuro.
- **Grafito** (`#4a4943`): texto secundario.
- **Apagado** (`#7a7770`): metadatos y caption.
- **Apagado claro** (`#c8c3b6`): texto secundario sobre fondo oscuro.
- **Blanco** (`#ffffff`): fondos de inputs y contraste puro.
- **WhatsApp** (`#2bb36b`): acciones de contacto por WhatsApp, usado con moderación.

### Named Rules

**The One Voice Rule.** El acento rojo es la única voz de color fuerte. No introducir segundos acentos saturados.

## 3. Typography

**Display / Body Font:** Montserrat, with system-ui fallback.
**Label / Mono Font:** JetBrains Mono, with ui-monospace fallback.

**Character:** Moderna, estructurada y cercana. Montserrat da peso sin rudeza; JetBrains Mono aporta una voz técnica pero no fría para etiquetas y metadatos.

### Hierarchy

- **Display** (600, `clamp(3.25rem, 6vw + 1rem, 6.75rem)`, line-height 0.96): títulos de hero.
- **Headline** (600, `clamp(2.5rem, 4.4vw + 0.5rem, 4.75rem)`, line-height 1): H2 de sección.
- **Title** (600, `clamp(1.75rem, 1.4vw + 1.2rem, 2.5rem)`, line-height 1.02): H3 de cards y sub-secciones.
- **Body** (400, 1rem, line-height 1.65): párrafos y formularios. Máximo 65–75ch.
- **Label** (500, 0.6875rem, line-height 1.4, letter-spacing 0.08em, uppercase): etiquetas de sección, metadatos, botones ghost.

### Named Rules

**The No-Frills Rule.** Nunca usar serifas decorativas, cursivas display ni fuentes script. La voz es directa.

## 4. Elevation

El sistema es predominantemente plano. La profundidad se comunica mediante capas tonales (hueso → hueso 2 → tinta → tinta 2) y bordes de 1px, no mediante sombras. La única excepción es el botón flotante de WhatsApp, que usa una sombra sutil para indicar que vive por encima del contenido.

### Shadow Vocabulary

- **Floating action** (`0 12px 28px rgba(14, 14, 12, 0.18)`): exclusivamente para el FAB de WhatsApp.

### Named Rules

**The Flat-By-Default Rule.** Las superficies no llevan sombra en reposo. Si algo necesita elevarse, debe justificarse como acción flotante.

## 5. Components

### Buttons

- **Shape:** sin radio de borde (`0`), esquinas nítidas.
- **Primary:** fondo `#d24a2a`, texto `#f2eee6`, borde `#d24a2a`, padding `0.95rem 1.4rem`, altura mínima 48px.
- **Hover / Focus:** fondo `#b83d1f`, borde `#b83d1f`; foco con outline 2px naranja y offset 3px.
- **Secondary:** fondo transparente, texto `#0e0e0c`, borde `#0e0e0c`; en fondo oscuro, texto y borde `#f2eee6`.
- **Ghost:** fondo transparente, texto `#0e0e0c`, borde `#d9d2c0`, tipografía mono uppercase xs; en fondo oscuro, texto `#f2eee6`.

### Inputs / Fields

- **Style:** fondo `#ffffff`, borde 1.5px `#d9d2c0`, sin radio, padding `0.75rem 1rem`.
- **Focus:** borde `#d24a2a`, glow `0 0 0 3px rgba(210, 74, 42, 0.12)`.
- **Error:** borde `#d24a2a`, mensaje en mono xs.

### Navigation

- **Style:** sticky top, fondo `rgba(242, 238, 230, 0.92)` con `backdrop-filter: blur(10px)`, borde inferior 1px `#d9d2c0`.
- **Typography:** logo en sans, meta en mono xs.
- **Mobile:** CTA se acorta a "Auditoría gratis" para evitar truncamiento.

### Cookie Banner

- **Style:** fixed bottom, fondo `#0e0e0c`, texto `#c8c3b6`, borde superior `#2a2a24`.
- **Actions:** botón primary y secondary alineados a la derecha.

## 6. Do's and Don'ts

### Do:

- **Do** usar el acento rojo en CTAs, foco y puntos de ancla; mantenerlo ≤10% de la pantalla.
- **Do** alternar secciones claras (hueso) y oscuras (tinta) para marcar ritmo.
- **Do** respetar el límite de 65–75ch en bloques de texto.
- **Do** usar JetBrains Mono solo para etiquetas, metadatos y botones ghost.
- **Do** preferir fotografía real de clínicas, equipos o reportes sobre ilustraciones genéricas.

### Don't:

- **Don't** usar fondos crema/beige genéricos de agencia, iconos de cohete o jerga en inglés.
- **Don't** usar azul clínico cliché, sonrisas blanquísimas o fotos de familia forzadas.
- **Don't** añadir bordes laterales gruesos como acento (`border-left > 1px`).
- **Don't** usar gradientes decorativos ni glassmorphism sin una razón funcional.
- **Don't** introducir un segundo acento saturado.
