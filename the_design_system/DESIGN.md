---
name: The Design System
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5c403b'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#916f6a'
  outline-variant: '#e6bdb7'
  surface-tint: '#be0f07'
  primary: '#870000'
  on-primary: '#ffffff'
  primary-container: '#b30000'
  on-primary-container: '#ffbeb4'
  inverse-primary: '#ffb4a8'
  secondary: '#635e53'
  on-secondary: '#ffffff'
  secondary-container: '#e9e2d3'
  on-secondary-container: '#696458'
  tertiary: '#404040'
  on-tertiary: '#ffffff'
  tertiary-container: '#585757'
  on-tertiary-container: '#cfcdcd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930000'
  secondary-fixed: '#e9e2d3'
  secondary-fixed-dim: '#cdc6b8'
  on-secondary-fixed: '#1e1b13'
  on-secondary-fixed-variant: '#4b463c'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 32px
  gutter: 24px
  card-padding: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The brand personality for this design system is **Academic, Reliable, and Focused**. It is designed for learners who seek a serious but engaging environment for language acquisition. The aesthetic draws from a "Neo-Classical Academic" style, blending the precision of modern SaaS dashboards with the tactile, timeless feel of traditional ink and parchment.

The visual direction uses a **Minimalist-Modern** approach with a high-emphasis on "Ink-on-Paper" contrast. By utilizing a soft parchment base instead of a harsh digital white, we reduce eye strain during long study sessions, while the deep red accents provide a sense of urgency and importance to key call-to-actions and progress milestones.

## Colors
The palette is rooted in a traditional Japanese-inspired trio, balanced for professional dashboard utility.

- **Primary (Deep Red):** Used for primary actions, branding, and high-priority status indicators. It represents vitality and focus.
- **Secondary (Parchment):** The foundation of the UI. This soft off-white serves as the primary background color for all screens, creating an organic, paper-like feel.
- **Neutral (Charcoal & Ink):** Used for text, borders, and iconography. This provides the necessary "ink" contrast against the parchment background.
- **Success/Warning/Error:** While not part of the core brand palette, these should be muted to match the academic tone (e.g., a sage green for success rather than a neon green).

## Typography
The typography system prioritizes extreme legibility for language learning. 

**Sora** is utilized for headlines to provide a sharp, geometric, and modern feel that subtly mirrors the structured strokes of East Asian typography. It should be used for section titles and data headers.

**Inter** is the workhorse for all body text, navigation, and input fields. Its neutral, systematic nature ensures that the focus remains on the content. 

**Styling Note:** For a subtle Japanese influence, use generous letter-spacing on `label-md` and occasional vertical text orientation for decorative side-labels or "Chapter" indicators.

## Layout & Spacing
This design system employs a **Fixed-Fluid Hybrid Grid**. 
- **Desktop:** 12-column grid with a maximum content width of 1440px. 
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing follows an 8px rhythmic scale. Dashboards should prioritize "information density with clarity," using `stack-lg` to separate major content blocks (e.g., Progress Overview vs. Lesson List) and `stack-sm` for related metadata. Layouts should utilize whitespace to frame information, similar to how traditional calligraphy is framed on a scroll.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Fine Outlines** rather than heavy shadows. This maintains the clean, academic feel.

- **Level 0 (Base):** Parchment (#FDF5E6).
- **Level 1 (Cards):** A slightly lighter white or the same parchment with a 1px solid border in a 10% opacity Charcoal.
- **Interactive States:** Use a subtle "lift" effect by adding a very soft, high-diffusion shadow (4px blur, 2% opacity) only on hover.
- **Overlays:** Modals use a 40% Charcoal backdrop blur to maintain focus on the academic task at hand.

## Shapes
The shape language is **Soft (Option 1)**. This uses a 0.25rem (4px) base radius. 

This subtle rounding prevents the UI from feeling too clinical or aggressive while maintaining a professional, structured appearance. It strikes the balance between the organic nature of learning and the structural rigor of linguistics. Progress bars and tags should use slightly higher roundedness (rounded-lg) to differentiate them as interactive or status-based elements.

## Components
Consistent styling of these elements ensures a unified educational experience.

- **Buttons:** 
  - *Primary:* Deep Red background, Parchment text. No border.
  - *Secondary:* Transparent background, Charcoal border (1px), Charcoal text.
- **Data Cards:** Parchment background with a 1px "Ink" border. Headers within cards should use `label-md` with a subtle bottom divider.
- **Progress Indicators:** Use the Deep Red for the "filled" state and a 10% opacity Charcoal for the "track." This creates high contrast for completionist motivation.
- **Comparison Tables:** Use alternating row stripes in a very faint Charcoal tint (2% opacity) to aid eye tracking across linguistic data points.
- **Chips/Tags:** Small, 4px rounded elements. For "JLPT Level" or "Difficulty," use Charcoal background with Parchment text to signify stability.
- **Input Fields:** Bottom-border only (like a notebook line) or 1px fully enclosed Charcoal border. Focus states must use a 2px Deep Red border for clear accessibility.