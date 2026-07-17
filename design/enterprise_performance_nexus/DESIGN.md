---
name: Enterprise Performance Nexus
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#444653'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#611e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#872d00'
  on-tertiary-container: '#ffa583'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb59a'
  on-tertiary-fixed: '#380d00'
  on-tertiary-fixed-variant: '#802a00'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin: 32px
---

## Brand & Style
The design system is engineered for high-stakes enterprise environments, specifically focusing on Performance Management and Resource Planning. The brand personality is **authoritative, transparent, and efficient**. It is designed to evoke a sense of professional reliability and stability, ensuring users feel empowered rather than overwhelmed by complex data.

The visual style follows a **Modern Corporate** aesthetic. It prioritizes functional clarity over decorative elements, utilizing generous white space, a disciplined color palette, and high-quality typography. The interface should feel like a precision tool: sharp, responsive, and systematic.

## Colors
The palette is rooted in a deep **Corporate Blue (#1E40AF)**, which establishes trust and professional hierarchy. This is contrasted against a **Light Gray background (#F3F4F6)** to reduce eye strain during long working hours and provide a neutral canvas for data visualization.

**Success Green (#10B981)** is used purposefully for growth indicators, completed tasks, and positive performance metrics. Neutral tones are used for borders and secondary text to maintain a calm visual environment. Semantic colors (Warning/Orange, Error/Red) are reserved strictly for status badges and critical alerts to ensure they command immediate attention without polluting the general UI.

## Typography
This design system utilizes **Inter** for all typographic needs. Chosen for its exceptional legibility in data-heavy interfaces and its systematic, neutral tone. 

The type scale is optimized for high information density. **Body-sm (13px)** is the workhorse for data tables and sidebars, while **Body-md (14px)** is used for standard reading. Headings use a tighter letter-spacing and heavier weights to provide clear structural anchoring. Labels use a slightly increased letter-spacing and uppercase styling to differentiate metadata from content.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a maximum content width of 1440px for desktop to prevent line lengths from becoming unreadable. A 12-column system is used for dashboard layouts.

Spacing is based on an **8px rhythm**. For data-heavy views (like ERP tables), the vertical spacing can be condensed to 4px (XS) to maximize "at-a-glance" visibility, while layout containers use 24px (LG) or 32px (XL) to provide breathing room. On mobile devices, margins shrink to 16px, and multi-column grids collapse into a single-column stack to maintain touch-target accessibility.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Low-Contrast Outlines**. Instead of heavy, distracting shadows, this design system uses subtle borders (`1px solid #E5E7EB`) to define card boundaries.

- **Level 0 (Background):** The base gray surface (#F3F4F6).
- **Level 1 (Default):** White surfaces (#FFFFFF) for cards and main content areas, creating a clear lift from the background.
- **Level 2 (Interactive/Overlay):** Modals and dropdowns use a soft, diffused shadow (10% opacity, 12px blur) with a subtle tint of the primary blue to indicate they are temporary, floating layers.

## Shapes
The shape language is **Professional and Structured**. A "Soft" roundedness level (4px / 0.25rem) is applied to buttons, input fields, and cards. This provides a modern touch while maintaining the geometric rigor expected of a corporate ERP. 

Buttons and badges use the standard 4px radius, while larger containers like modal overlays may use up to 8px to feel slightly more approachable. Circles are used exclusively for user avatars and icon backgrounds.

## Components

### Status Badges
Badges use a "Soft Background" style—a pale tint of the semantic color with high-contrast text:
- **Diterima (Accepted):** Background: #D1FAE5 | Text: #065F46 (Success Green)
- **Menunggu (Pending):** Background: #FEF3C7 | Text: #92400E (Amber)
- **Direvisi (Revised):** Background: #DBEAFE | Text: #1E40AF (Primary Blue)
- **Ditolak (Rejected):** Background: #FEE2E2 | Text: #991B1B (Red)

### Data Tables
Tables are designed for high density. Use a `1px` bottom border for rows. Header cells use `label-md` typography with a light gray background (#F9FAFB) to anchor the data. Row hover states should trigger a very subtle blue tint (#EFF6FF) to help the user track information horizontally.

### Stat Cards
Statistical summaries should feature a large `headline-md` value, a `label-md` title, and a small trend indicator (using the Success Green for positive or Red for negative trends).

### Form Inputs
Inputs use a white background with a light gray border. On focus, the border transitions to the **Primary Blue (#1E40AF)** with a 2px outer "halo" (glow) at 10% opacity. Labels are always positioned above the input for maximum clarity.

### Buttons
- **Primary:** Solid #1E40AF with white text.
- **Secondary:** Outline #E5E7EB with #1F2937 text.
- **Ghost:** No background/border, used for "Cancel" or less frequent actions.