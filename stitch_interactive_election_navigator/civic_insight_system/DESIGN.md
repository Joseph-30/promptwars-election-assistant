---
name: Civic Insight System
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#42474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#727780'
  outline-variant: '#c2c7d1'
  surface-tint: '#2d6197'
  primary: '#00355f'
  on-primary: '#ffffff'
  primary-container: '#0f4c81'
  on-primary-container: '#8ebdf9'
  inverse-primary: '#a0c9ff'
  secondary: '#006d37'
  on-secondary: '#ffffff'
  secondary-container: '#6bfe9c'
  on-secondary-container: '#00743a'
  tertiary: '#263544'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c4c5c'
  on-tertiary-container: '#abbccf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#a0c9ff'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#07497d'
  secondary-fixed: '#6bfe9c'
  secondary-fixed-dim: '#4ae183'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005228'
  tertiary-fixed: '#d3e4f8'
  tertiary-fixed-dim: '#b8c8db'
  on-tertiary-fixed: '#0c1d2b'
  on-tertiary-fixed-variant: '#394858'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  h1:
    fontFamily: Public Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  h3:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  quiz-option:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

This design system is engineered to facilitate learning and civic engagement through a lens of institutional reliability and modern accessibility. The brand personality is that of a "Trusted Guide"—knowledgeable, objective, and encouraging without being overly academic or partisan. 

The visual style follows a **Corporate / Modern** aesthetic, prioritizing clarity and functional elegance. It utilizes high-quality whitespace to reduce cognitive load during complex educational tasks. The interface should feel "official" yet welcoming, bridging the gap between a government resource and a contemporary educational platform. Every element is designed to evoke a sense of progress, clarity, and democratic participation.

## Colors

The palette is anchored by "Authoritative Blue" to establish immediate trust and credibility. This is complemented by "Progress Green," used strategically for success states, completion indicators, and forward-moving actions.

- **Primary (Authoritative Blue):** Used for navigation, primary buttons, and institutional headings.
- **Secondary (Progress Green):** Used for trackers, "correct" quiz feedback, and completion milestones.
- **Neutral Scale:** A range of cool grays and off-whites provides a clean canvas that prevents visual fatigue.
- **Accent:** A soft slate blue is used for secondary information and non-essential UI elements to maintain a non-political, neutral tone.

## Typography

This design system utilizes two distinct sans-serif families to balance authority with readability. 

**Public Sans** is used for headings and interface labels. Its institutional heritage (originally designed for government use) provides the necessary professional weight and clarity. 

**Lexend** is employed for all body copy and educational content. Specifically designed to improve reading proficiency and reduce visual stress, it ensures that civic concepts are accessible to users of all ages and reading levels. 

Maintain a high line-height (1.6) for educational prose to ensure maximum legibility and scanability.

## Layout & Spacing

The design system utilizes a **Fixed Grid** system for desktop (12 columns) and a fluid 4-column grid for mobile devices. A strict 8px spatial rhythm governs all padding and margins to create a disciplined, professional structure.

- **Content Width:** Main educational content is capped at a readable 720px width within the larger container to prevent overly long line lengths.
- **Vertical Rhythm:** Generous vertical spacing (xl/48px) is used between major sections to allow the user to "breathe" while processing complex civic information.
- **Information Density:** Use moderate padding in cards and forms to maintain a balance between utility and approachability.

## Elevation & Depth

To maintain a trustworthy and modern feel, this design system uses **Tonal Layers** supplemented by **Ambient Shadows**. 

- **Surface Tiers:** Backgrounds are generally white (#FFFFFF) or very light gray (#F8FAFC). Educational cards sit on a subtle elevation layer.
- **Shadows:** Use extremely soft, blurred shadows with a low opacity (e.g., `box-shadow: 0 4px 20px rgba(15, 76, 129, 0.08)`). The shadow color should have a slight blue tint from the primary palette to maintain brand cohesion.
- **Interaction:** On hover, elements like interactive cards or quiz options should lift slightly (increasing shadow depth) rather than changing color aggressively, signaling interactivity through physical metaphors.

## Shapes

The shape language of this design system is **Rounded**, using 0.5rem (8px) as the base radius. This softening of geometric corners makes the "official" content feel more modern and approachable.

- **Primary Buttons:** Use the standard `rounded-lg` (1rem/16px) for a modern, friendly appearance.
- **Educational Cards:** Use `rounded-xl` (1.5rem/24px) to define distinct learning modules.
- **Input Fields:** Use the base `rounded` (0.5rem/8px) to maintain a professional, structured feel for data entry.

## Components

### Educational Cards
Cards are the primary vehicle for content. They feature a white background, a soft blue-tinted shadow, and a 24px internal padding. They may include a "top border" accent in Progress Green to indicate completed sections.

### Progress Trackers
Linear progress bars use a thick 8px track. The background is a pale neutral-200, and the fill is a gradient of Progress Green. Vertical step-indicators are used for course overviews, using the Authoritative Blue for current and completed states.

### Interactive Timeline
Timelines use a central vertical spine. Each "event" is a small card connected to the spine. Use Authoritative Blue for dates and Progress Green for "Your Progress" markers along the line.

### Quiz UI Elements
- **Options:** Large, tap-friendly buttons with a subtle 1px border.
- **Selection State:** On selection, the border thickens and changes to Authoritative Blue.
- **Feedback State:** Immediate color transition to Green (Success) or a neutral Slate (Incorrect), accompanied by a brief text explanation.

### Accessible Region Selection
Selection forms use large, clear dropdowns or searchable "combo boxes." Every input must have a visible, permanent label in Public Sans and a clear focus state for keyboard navigation.

### Buttons
- **Primary:** Solid Authoritative Blue with white text.
- **Secondary:** Outlined Blue with 2px stroke.
- **Success:** Solid Progress Green for final "Submit" or "Finish" actions.