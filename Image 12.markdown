---
name: Academic Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#444651'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#442100'
  on-tertiary: '#ffffff'
  tertiary-container: '#653400'
  on-tertiary-container: '#fc922b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: 0em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
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
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system reflects an institutional, high-reliability utility aesthetic engineered for institutional discipline, clarity, and rapid scanning operations. It serves administrative personnel, educators, and students interacting with on-premise local area network (LAN) kiosks and mobile scanners.

The visual tone merges **Modern Corporate utility** with a **technical Scanner HUD interface**:
- Utilitarian efficiency: Zero clutter, distinct semantic validation, and micro-delight upon scan confirmation.
- Academic authority: Structured information hierarchies built on crisp geometric alignments, stable baseline grids, and clear typographic contrast.
- Optical feedback: Scanner viewfinders, high-visibility status badges, and rapid visual confirmation cues built for low-latency interactions in high-throughput school environments.

## Colors
The color hierarchy is optimized for split-second status identification in varied ambient lighting conditions across campus lobbies and classroom checkpoints.

- **Primary (`#1E3A8A` / `#2563EB`)**: Anchor brand identity representing institutional trust, system authority, and active structural chrome.
- **Secondary / Success (`#10B981` / `#059669`)**: Dedicated to positive scan confirmations, on-time arrivals, and active LAN gateway health.
- **Tertiary / Warning (`#D97706`)**: Denotes late arrivals, pending verifications, or synchronization queues.
- **Critical / Error (`#E11D48`)**: Signifies unauthorized badges, unrecognized QR codes, absence statuses, or LAN offline disconnects.
- **Surfaces & Neutrals**: 
  - Canvas: `#F8FAFC` (Slate 50)
  - Card/Container Surface: `#FFFFFF`
  - Subtle Surface: `#F1F5F9` (Slate 100)
  - Borders/Dividers: `#E2E8F0` (Slate 200)
  - Text Primary: `#0F172A` (Slate 900)
  - Text Secondary: `#64748B` (Slate 500)

## Typography
Typographic rhythm combines **Plus Jakarta Sans** for crisp, geometric headers and **Inter** for dense, neutral data display.

- **Headlines**: Use Plus Jakarta Sans with tighter letter spacing (`-0.01em` to `-0.02em`) to command presence on large kiosk viewports and dashboard metrics.
- **Numerical & Student Data**: Tabular layout numbers (via font-variant-numeric: `tabular-nums`) must be enabled on attendance counters, timestamps, NISN identifiers, and live clock tickers.
- **Labels & Badges**: Set in Inter Medium/Semi-Bold with micro-letter-spacing (`0.02em` to `0.04em`) and uppercase treatment when specifying strict states (e.g., `HADIR`, `TERLAMBAT`, `ALPA`).

## Layout & Spacing
The layout adheres to a fixed-fluid hybrid structure designed for continuous operation across desktop monitors, wall-mounted kiosk tablets, and mobile duty scanners.

- **Grid Framework**: 12-column responsive fluid grid on desktop (`1280px+` container max width), condensing to an 8-column layout on tablet (`768px - 1024px`), and a unified single-column flow on mobile/portrait terminals (`<768px`).
- **Scan Terminal Layout**: Two-panel division on desktop terminals: left panel pinned at `400px` or `45%` for the live QR camera viewfinder, right panel for the live attendance feed and confirmation cards.
- **Touch Ergonomics**: All interactive elements (trigger inputs, modal closures, camera toggles) maintain a minimum target area of `48px × 48px` to facilitate high-velocity touch actions.

## Elevation & Depth
Depth is articulated via structured surface layering combined with low-contrast precision borders rather than deep, heavy shadows, maintaining high legibility under harsh ambient school lighting.

- **Level 0 (Canvas)**: Background `#F8FAFC`.
- **Level 1 (Card/Container)**: Background `#FFFFFF`, border `1px solid #E2E8F0`, shadow `0 1px 3px 0 rgba(15, 23, 42, 0.05)`.
- **Level 2 (Interactive/Dropdown/Hover)**: Background `#FFFFFF`, border `1px solid #CBD5E1`, shadow `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modal/Overlay/HUD Drawer)**: Background `#FFFFFF`, border `1px solid #CBD5E1`, shadow `0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05)`.
- **Optical Laser Accent**: Live scanning states utilize an inset or focal glow using `0 0 0 3px rgba(37, 99, 235, 0.2)` or `0 0 0 3px rgba(16, 185, 129, 0.2)` upon target acquisition.

## Shapes
The shape language implements a disciplined, balanced geometry with `0.5rem` (8px) base corner radiuses to reinforce modern institutional utility.

- Standard interactive controls, form fields, and table cards adopt `8px` corner radiuses.
- Viewfinder frames and major modal containers scale up to `12px` - `16px` (`rounded-lg` to `rounded-xl`).
- Status indicators and chip tags feature a continuous pill profile (`rounded-full`) to distinctly separate semantic status badges from rectangular actionable elements.

## Components

### Buttons
- **Primary**: Solid `#1E3A8A` background with crisp `#FFFFFF` text. Hover transitions to `#2563EB`. Padding: `0.625rem 1.25rem`. Height: `44px` (minimum `48px` on kiosk presets).
- **Secondary/Outline**: Transparent surface with `1px solid #E2E8F0` border and `#0F172A` text. Hover uses `#F1F5F9`.
- **Status Triggers**: Contextual action buttons using direct status tokens (e.g., `#10B981` for manual attendance verification, `#E11D48` for instant reporting).

### Chips & Status Badges
- **Hadir (Present)**: Surface `#ECFDF5`, text `#065F46`, border `1px solid #A7F3D0`.
- **Terlambat (Late)**: Surface `#FFFBEB`, text `#92400E`, border `1px solid #FDE68A`.
- **Alpa / Tidak Hadir (Absent)**: Surface `#FFF1F2`, text `#9F1239`, border `1px solid #FECDD3`.
- **Izin / Sakit (Excused)**: Surface `#EFF6FF`, text `#1E40AF`, border `1px solid #BFDBFE`.
- Height: `24px` to `28px`, compact font `12px` font weight `600`, pill radius (`9999px`).

### QR Scanner HUD Viewfinder
- High-contrast camera viewport surrounded by a semi-transparent dark vignette (`rgba(15, 23, 42, 0.6)`).
- Crisp framing corners: 4 SVG L-brackets positioned at the active scan matrix corners, styled in `#FFFFFF` during idle state and switching to `#10B981` instantly upon barcode lock.
- Animated horizontal target laser: subtle line (`2px`) with a linear gradient spanning `#2563EB` to `#60A5FA` animating on a vertical loop.

### Cards & Feed Lists
- **Live Scan Feed**: Attendance list items appear sequentially with smooth slide-down animation. Each row includes the student photo/avatar (`40px × 40px` rounded-full), student name, NISN, class label, exact timestamp (`tabular-nums`), and pill status badge.
- **LAN Connectivity Header**: System status indicator widget positioned at the navigation top bar showing local server ping, sync state, and terminal IP (`192.168.x.x`) with a pulsing green indicator dot.

### Inputs & Search Bars
- Background `#FFFFFF`, border `1px solid #CBD5E1`, text `#0F172A`, placeholder `#94A3B8`.
- Focus states leverage a clean `#2563EB` border paired with an ambient ring: `box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15)`.
- Numeric input fields for manual barcode/NISN entry default to monospaced/tabular numerical display for zero ambiguity.