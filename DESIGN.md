---
name: Spine Studio
description: Web, SEO, and strategy with a backbone.
colors:
  bone-white: "#f4f4f1"
  void-black: "#050505"
  ink-black: "#0a0a0a"
  mute: "rgba(244, 244, 241, 0.62)"
  line: "rgba(244, 244, 241, 0.28)"
typography:
  display:
    fontFamily: "Oswald, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.35rem, 11vw, 12rem)"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Oswald, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.85rem, 4vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.05em"
  title:
    fontFamily: "Oswald, ui-sans-serif, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "-0.04em"
  body:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.05em"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.24em"
rounded:
  none: "0px"
spacing:
  sm: "1.25rem"
  md: "2rem"
  lg: "5rem"
  xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.bone-white}"
    textColor: "{colors.void-black}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.25rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.bone-white}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.25rem"
    typography: "{typography.label}"
  button-ghost-hover:
    backgroundColor: "{colors.bone-white}"
    textColor: "{colors.void-black}"
  field-spine:
    backgroundColor: "transparent"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1rem"
    typography: "{typography.label}"
  field-spine-focus:
    backgroundColor: "{colors.bone-white}"
    textColor: "{colors.void-black}"
---

# Design System: Spine Studio

## Overview

**Creative North Star: "The Vertebral Descent"**

You enter at the skull and drop through a xeroxed column. Every screen is a stop on that descent: type as vertebrae, grain as bone dust, black as the canal. The interface recedes so the artifact — the 3D spine and the display lockup — can lead.

The system is high-contrast, italic-display, mono-instrumented. It is not a generic dark theme. White is bone; black is void; there is no brand red on the live site. Motion is descent, lean, and photocopy snap — not bounce, not fade-for-fade's-sake.

**Key Characteristics:**
- Skull at the top, column below; navigation is a spine, not a header bar
- Oswald italic display vs IBM Plex Mono instrumentation
- Sharp corners, 1px bone strokes, invert-on-hover
- Ink/xerox grain over 3D, never clean CGI
- Tablet column tucks to a cue; phones open a full-screen index

## Colors

Bone on void. No accent hue. Contrast does the work.

### Primary
- **Bone White** (#f4f4f1): Type, strokes, solid buttons, selection invert. The only light.

### Neutral
- **Void Black** (#050505): Page ground and overlay sheets.
- **Ink Black** (#0a0a0a): Slightly lifted black for 3D void / stills.
- **Mute** (rgba(244, 244, 241, 0.62): Secondary mono copy.
- **Line** (rgba(244, 244, 241, 0.28): Hairlines, vertebra edges.

### Named Rules
**The One Bone Rule.** Do not introduce a second accent. If it is not bone or void, it is not Spine.

## Typography

**Display Font:** Oswald (ui-sans-serif fallback)
**Body / Label Font:** IBM Plex Mono (ui-monospace fallback)

**Character:** Display is compressed italic uppercase — the vertebra. Mono is tracking-wide uppercase instrumentation — the chart notes on the bone.

### Hierarchy
- **Display** (700 italic, clamp to ~12rem, line-height ~0.85, tracking -0.04em to -0.08em): Hero lockup (SPINE / STUDIO).
- **Headline** (700 italic, ~1.85–3.75rem): Section titles.
- **Title** (700 italic, 1.35rem): Left column nav labels.
- **Body** (400, 0.875rem, tracking 0.05em): Supporting copy, still uppercase in site voice.
- **Label** (400, 11px, tracking 0.24em, uppercase): Kickers, buttons, form labels, INDEX cue.

### Named Rules
**The Stroke Fill Rule.** Idle display nav is outlined (`color: transparent` / faint fill + `-webkit-text-stroke`). Active and hover fill solid bone.

## Layout

Vertical descent. Each `.vertebra-stop` is min-height 100svh. Copy sits in `.vertebra-panel` (max-width 72rem, padding 5rem/1.25rem, 6rem/2rem from 768px) over a left-weighted black wash so type reads on the 3D.

Fixed chrome: logo top-left; phones use INDEX overlay; 768–1279px left column is a tucked cue that reveals on hover/tap and hides on scroll-down; 1280px+ the type column stays visible. Do not add a conventional top bar.

Spacing rhythm is 1.25 / 2 / 5 / 6 rem. Breakpoints in use: 768px, 1280px.

## Elevation & Depth

No drop shadows. Depth is the 3D field, grain overlay, and left-to-right panel gradient (`rgba(5,5,5,0.78)` → transparent) plus 2px backdrop blur. Overlays are opaque void (#090807 / #050505), not glass.

### Named Rules
**The Flat Chrome Rule.** UI chrome is flat. Only the specimen (skull/spine) occupies space.

## Shapes

Radius is 0. Geometry is the 1px bone rectangle, the diamond cue tick (6px rotated square), and the S-offset type stack. Inline cuts and bars are 2px bone rules, not rounded pills.

## Components

### Buttons
- **Shape:** 0 radius, 1px bone border, padding 0.75rem 1.25rem, mono 0.875rem, tracking 0.16em, uppercase.
- **Primary:** Bone fill, void type. Hover: fill empties, type becomes bone.
- **Ghost:** Inverse of primary. Hover: bone fill, void type.

### Cards / Containers
- **Corner Style:** 0.
- **Background:** Transparent or void wash.
- **Border:** 1px bone at ~0.15–0.25 opacity, or full bone on forms.
- **Internal Padding:** 1.25–2rem.

### Inputs / Fields
- **Style:** Full-width, 1px bone, transparent fill, mono uppercase.
- **Focus:** Invert — bone fill, void type. Placeholder darkens.

### Navigation
- **Desktop column:** Italic Oswald labels, S-curve X offsets, outline idle / fill active.
- **Tablet cue:** Vertical INDEX + four diamond ticks; active tick filled.
- **Mobile:** INDEX / CLOSE swap; sheet wipes down; compact stack over xerox skull void.

### Signature: Vertebra stop
Full-viewport section with a faint vertical hairline and a left-weighted panel. The 3D descent continues behind. Do not card these into a grid.

## Do's and Don'ts

### Do:
- **Do** keep display italic, uppercase, tight tracking.
- **Do** invert (bone ↔ void) for hover and focus.
- **Do** treat nav as a column/spine, including tucked cues on tablet.
- **Do** let xerox grain and 3D carry atmosphere.

### Don't:
- **Don't** add colored accents, gradients-as-brand, or rounded pills.
- **Don't** put a sticky multi-link header over the descent.
- **Don't** present unmarked case studies as proven client results.
- **Don't** use bounce, elastic, or identical fade-up on every section.
