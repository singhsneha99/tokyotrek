---
name: Neo Shinjuku Noir
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393d'
  surface-container-lowest: '#0c0e11'
  surface-container-low: '#1a1c1f'
  surface-container: '#1e2023'
  surface-container-high: '#282a2d'
  surface-container-highest: '#333538'
  on-surface: '#e2e2e6'
  on-surface-variant: '#e6bcbf'
  inverse-surface: '#e2e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#ac888a'
  outline-variant: '#5c3f41'
  surface-tint: '#ffb2b9'
  primary: '#ffb2b9'
  on-primary: '#67001e'
  primary-container: '#ff5070'
  on-primary-container: '#5b0019'
  inverse-primary: '#be003f'
  secondary: '#fbb3c1'
  on-secondary: '#50212d'
  secondary-container: '#6b3743'
  on-secondary-container: '#e8a2b0'
  tertiary: '#00e475'
  on-tertiary: '#003918'
  tertiary-container: '#00a754'
  on-tertiary-container: '#003114'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdadc'
  primary-fixed-dim: '#ffb2b9'
  on-primary-fixed: '#40000f'
  on-primary-fixed-variant: '#91002e'
  secondary-fixed: '#ffd9df'
  secondary-fixed-dim: '#fbb3c1'
  on-secondary-fixed: '#360c19'
  on-secondary-fixed-variant: '#6b3743'
  tertiary-fixed: '#62ff96'
  tertiary-fixed-dim: '#00e475'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#005226'
  background: '#111317'
  on-background: '#e2e2e6'
  surface-variant: '#333538'
typography:
  display-hero:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-data-lg:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-data-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-data-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system targets urban explorers, night-crawlers, and design-forward travelers traversing Tokyo's high-density neighborhoods. It evokes the electric intimacy of Kabukicho back-alleys, Shibuya rain-slicked crosswalks, and quiet residential vending machine alcoves. The emotional response balances sensory excitement with high-utility calm: thrilling yet relentlessly clear under ambient night glare.

The visual style is **Cyberpunk-Lite / Modern Tokyo Night**. Rather than decaying retro-futurism, it synthesizes precision iOS human interface ergonomics with calibrated luminous accents. Deep obsidian layers anchor the viewport while hyper-saturated neon glows operate strictly as information beacons—indicating price thresholds, live transit status, and crowd densities. Interfaces employ dark frosted glass sheets, precise 1px specular strokes, and monospaced data anchors to deliver an ultra-responsive, handheld navigator optimized for one-thumb walking navigation.

## Colors

The palette reproduces the chromatic atmosphere of nocturnal Tokyo: a bedrock of light-absorbing asphalt punctuated by signage emissions.

### Functional Roles
- **Primary (`#FF2A5F` — Neon Crimson):** High-priority alerts, splurge markers, primary navigation hits, live district hot-spots, and energetic interactive triggers.
- **Secondary Accent (`#FFB7C5` — Soft Sakura Pink):** Atmospheric highlights, micro-badges, cultural tags, serene landmark accents, and softening counters to harsh neons.
- **Tertiary / Success (`#00E676` — Vivid Emerald):** Subway connection confirmations, active states, open venue badges, and the low-budget "Cheap" metric tier.
- **Warning / Tier 2 (`#FF9100` — Neon Amber):** Moderate crowd density, medium budget metrics, closing-soon alerts, and transit delays.
- **Neutral Canvas Hierarchy:**
  - Base Floor: `#0D0F12` (Pure Obsidian Slate)
  - Surface Mid: `#13171F` (Dark Matte Glass Base)
  - Surface Elevated: `#1A1F29` (Raised Bottom Drawers, Float Bars)
  - Muted Borders & Fill: `#22252C` to `#3A3D45`
  - Inactive / Visited Typography: `#8A8F99`
  - Core Text: `#FFFFFF` for primary visibility, `#E1E4EA` for secondary body copy.

Always restrict pure white text to titles, live statuses, and numerals to maintain screen contrast without washing out the ambient neon glows.

## Typography

The type system pairs ultra-neutral neo-grotesque structural type (`Inter`) with a monospace-influenced geometric companion (`Space Grotesk`) for data, station codes, timestamps, and pricing counters. In Japanese bilingual contexts, Inter falls back natively to Hiragino Kaku Gothic ProN or Noto Sans JP with matched baseline weight adjustments.

### Typographic Roles
- **Hero & Headlines:** High-weight, slightly condensed tracking for high legibility while in motion on crowded sidewalks.
- **Body:** Neutral, unadorned, rendered in `#FFFFFF` or `#E1E4EA` over dark glass surfaces.
- **Technical & Metric Indicators:** Formatted in `Space Grotesk`, all-caps or tabular numerals. Used for platform track IDs, budget tier pips, train delay timers, and GPS coordinates.

## Layout & Spacing

The layout is built for native iOS interaction, designed for mobile portrait viewports as the primary medium, scaling to an expansive multi-column dashboard on tablet devices.

### Layout Mechanics
- **Mobile (Default):** Fluid 4-column layout with fixed `1rem` outer margins and `0.75rem` gutters. Crucial actions are pegged within the bottom thumb arc (bottom 40% of the screen). Floating chrome accounts for safe-area home indicators.
- **Tablet / Large Form Factor:** Fluid 8-to-12 column system with maximum container width of `960px`. Persistent map/route canvas on the left 60%, sliding inspector drawer pinned to the right 40%.
- **Vertical Rhythm:** Strict 4px/8px incremental spacing scale. Micro-gaps between telemetry data stay snug (`0.25rem` to `0.5rem`), while card blocks detach via `1.25rem` intervals to enforce card isolation against dark maps.

## Elevation & Depth

Visual hierarchy uses frosted glassmorphism overlaid on ambient dark canvas, illuminated by subtle neon perimeter backlights.

### Surface Tiers
- **Floor 0 (Map & Canvas):** Pitch Obsidian (`#0D0F12`), completely flat, hosting dark vector map geometry, custom neon polyline routes, and faint street gridlines.
- **Level 1 (In-flow Cards & Feeds):** Translucent glass base (`#141822` with 80% alpha and `backdrop-filter: blur(20px)`). Framed by a 1px solid stroke in `#22252C`.
- **Level 2 (Interactive Floating Elements):** Active pills, selected cards, and interactive chips use a 1px border tinted in `#FF2A5F` at 40% opacity, paired with an ambient tinted shadow (`box-shadow: 0 4px 20px -2px rgba(255, 42, 95, 0.25)`).
- **Level 3 (Modal Sheets & Bottom Drawers):** `#1A1F29` with 92% opacity and `backdrop-filter: blur(32px)`. Features a top specular border: 1px gradient line starting from transparent, turning `#FFB7C5` (30% opacity) at center, and fading to transparent.
- **Neon Glow Rules:** Glows are reserved exclusively for interactive focus, status pins, and active transit paths. Never cast diffused glow around passive content blocks.

## Shapes

The design system embraces high-curvature roundedness (`roundedness: 3`), drawing directly from modern iOS conventions and ergonomic handheld hardware.

- **Primary Pills & Action Buttons:** Fully pill-shaped (`9999px` / `rounded-full`) for high-speed hit targets, thumb selectors, and status chips.
- **Cards & Drawer Containers:** Rounded corners (`1.5rem` to `2rem` / `rounded-xl` to `rounded-2xl`) to soften dense technical information and replicate curved OLED displays.
- **Badges & Neon Ring Indicators:** Strict circular geometry (`rounded-full`) creating glowing halo rings around transit status indicators, venue price gauges, and avatar icons.

## Components

### Buttons & Interactive Controls
- **Primary Cyber CTA:** Full pill contour, filled with `#FF2A5F`, text in `#FFFFFF` (`Space Grotesk`, bold, uppercase). Includes an inner rim glow and an ambient outer shadow (`rgba(255, 42, 95, 0.35)`). Active tap scales to `0.97` with haptic feedback.
- **Secondary Ghost Pill:** Transparent backdrop, 1px stroke of `#3A3D45`, text in `#E1E4EA`. On press, transitions border to `#FFB7C5` with a subtle white fill flash (`rgba(255, 255, 255, 0.06)`).

### Chips & Dynamic Selectors
- **iOS Pill Filter Array:** Horizontally scrollable row of pill-shaped segment chips (`space-xs` padding, `0.75rem` vertical, `1rem` horizontal). Inactive: `#1A1F29` filled with `#8A8F99` typography. Active: `#FF2A5F` neon edge with subtle crimson background tint (`rgba(255, 42, 95, 0.15)`) and bold white text.

### Badges & Neon Rings
- **Status Halo Rings:** 8px core status dot surrounded by a 16px concentric ring with a 1.5px stroke.
  - Emerald (`#00E676`): Open now / Cheap budget level (`¥`).
  - Amber (`#FF9100`): Closing soon / Moderate budget level (`¥¥`).
  - Crimson (`#FF2A5F`): Peak crowd / Splurge luxury level (`¥¥¥`).

### Bottom Drawer Sheet
- Pull-up interactive sheet anchored to the bottom edge with a top drag indicator (36px wide, 4px high, `#3A3D45`, rounded-full). Dark frosted glass substrate (`#141822`, 90% opacity, `blur(24px)`). Automatically snaps between peek height (180px), half height (50%), and full immersion (92%).

### Time Travel Line
- An interactive vertical/horizontal route-timeline representing transit progress. Composed of a 2px `#22252C` track that fills with a luminous `#00E676` or `#FF2A5F` gradient beam as stops are traversed. Past stations display muted graphite markers (`#3A3D45`), current station pulses with a neon ring, and future stations remain hollow slate circles.

### Sticky Floating Bottom Bar
- Detached navigation island floating `1.25rem` above the bottom screen margin. Rounded-full silhouette, translucent obsidian fill (`#13171F` at 85% opacity), top edge defined by a hairline stroke (`#3A3D45`). Hosts key navigation icons with neon pink underline pips for the selected section.