# Portfolio Smoothness & GPU Layer Optimization

Deliver silky-smooth 60fps+ scrolling and instant tab/card transitions across the Obsidian Studio portfolio by pre-decoding Project Orbit switcher visuals off the main thread and tightening CSS containment and GPU compositor layer promotion across all sections.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following optimization decisions were confirmed during interactive clarification and govern this implementation:

- **Confirmed Decision 1 — Terminal Typing Descriptions**: Keep the current character-interval typing cadence so the cyber telemetry feel remains intact, while pre-compiling the highlight regular expression once per component instance so each interval tick renders with zero allocation overhead.
- **Confirmed Decision 2 — Pointer & Tilt Responsiveness**: Keep direct pointer event updates for 3D card tilt, capability tile glow, and ambient background movement for zero-latency cursor tracking.
- **Confirmed Decision 3 — Off-Thread Project Orbit Image Pre-Decoding & CSS Containment**: Pre-decode all four Project Orbit switcher showcase images off the main thread when the `#work` section approaches the viewport, and optimize CSS layout/paint containment and GPU layer promotion across section containers and interactive surfaces.

---

## 1. Overview & Core Concept

- **What It Does**: Eliminates main-thread image decode hitches when switching between the four Featured Project Spotlight tabs (`01 Attack Model`, `02 Delivery UX`, `03 AI Studio`, `04 Polur Charm`) and reduces compositor repaint cost during vertical and horizontal scroll via targeted CSS containment and GPU layer promotion.
- **Target Audience / Persona**: Recruiters, engineering managers, and visitors browsing the portfolio across desktop, mid-range laptops, and mobile devices who expect instant tab switching and fluid scrolling.
- **Key Value**: Tab switches in the Featured Project Spotlight cross-fade immediately without image decode stutter, and scrolling across dense editorial bands (`#about`, `#work`, `#project-collection`, `#experience`, `#credentials`, `#contact`) stays locked to compositor frames.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Scrolling into Selected Work (`#work`)**: As the user approaches the Featured Project Spotlight (`ProjectOrbitSelector`), an `IntersectionObserver` pre-fetches and runs off-thread `HTMLImageElement.decode()` on the four spotlight visuals so switching between `01 Attack Model`, `02 Delivery UX`, `03 AI Studio`, and `04 Polur Charm` renders with zero frame drops.
  2. **Switching Featured Project Tabs**: Clicking or hovering any tab in the segmented switcher transitions the active pill and cross-fades the already-decoded `16:10` showcase artwork and editorial dossier in $\le 220\text{ms}$ using smooth compositor-only transforms (`opacity`, `scale`, `translate3d`).
  3. **Scrolling Across Editorial Sections**: Each editorial band uses calibrated CSS `contain: layout style` and `content-visibility: auto` (with matched `contain-intrinsic-size`) and promotes active animated surfaces (`transform: translateZ(0)`, `backface-visibility: hidden`) so scrolling never triggers cross-section layout recalculations.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Asymmetric Obsidian Studio editorial monograph with stark jet-black and deep obsidian surfaces (`#06050a`, `#0d0b15`), crisp hairline borders (`rgba(255, 255, 255, 0.08)`), and restrained ultraviolet (`#a78bfa`) and cyan (`#22d3ee`) focal accents.
  - *Color Palette & Mood*: Preserves the 60-30-10 dark-mode balance—60% deep obsidian canvas, 30% structural glass/panel framing, and 10% high-contrast violet/cyan interactive signal accents.
  - *Typography & Hierarchy*: Preserves the expressive display headlines (`text-wrap: balance`), clean geometric body prose, and tabular monospace metrics (`font-mono tabular-nums`).
  - *Component Styling & Layout*: Full 1440px desktop baseline with asymmetric editorial split grids, fixed `16:10` and `2:3` media aspect ratios to prevent layout shifts, and single-elevation card framing.
- **Interactive Feedback & Motion**:
  - Preserves direct pointer responsiveness on 3D project cards, capability tiles, and ambient background orbs.
  - Keeps character-interval typing in `CyberTypingDescription` while memoizing highlight regular expressions so typing ticks never allocate new regex objects.
  - Strictly honors `prefers-reduced-motion: reduce`, `.motion-paused`, and `.low-data`.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Viewport-Gated Off-Thread Pre-Decoding for Project Orbit Switcher**
  - *Chosen Approach*: Observe the `ProjectOrbitSelector` container with an `IntersectionObserver` (`rootMargin: "320px 0px"`) and pre-decode the 4 showcase images via `new Image()` + `img.decode()` off the main thread as the user scrolls near `#work`.
  - *Why*: Avoids competing with above-the-fold Hero assets during initial load while guaranteeing that all 4 switcher visuals are already decompressed in GPU/bitmap memory before the user clicks a tab.
  - *Alternatives Considered*: Eagerly preloading all 4 images on initial page mount (rejected to keep initial page load lightweight) or decoding on tab click (causes a visible frame hitch on first tab switch).
- **Decision 2: CSS Containment & Scoped GPU Layer Promotion**
  - *Chosen Approach*: Apply `contain: layout style` and compositor promotion (`transform: translate3d(0, 0, 0)`, `backface-visibility: hidden`) to interactive cards, spotlight containers, walkthrough stages, and fixed navigation overlays while releasing unnecessary `will-change` allocations when idle.
  - *Why*: Prevents style or layout mutations inside one card (such as typing intervals or walkthrough steps) from invalidating layout in sibling cards or parent sections during scroll.
  - *Alternatives Considered*: Applying `will-change: transform, opacity` globally to every DOM node (rejected because excessive layer promotion exhausts GPU VRAM on mobile and mid-range devices).

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        Viewport & Scroll Pipeline                        │
│  • Section CSS Containment (contain: layout style / content-visibility)  │
│  • Scoped GPU Layer Promotion (translate3d(0,0,0) / backface-hidden)     │
└───────────────────┬──────────────────────────────────┬───────────────────┘
                    │                                  │
                    ▼                                  ▼
┌──────────────────────────────────────┐  ┌────────────────────────────────┐
│     ProjectOrbitSelector Engine      │  │   Interactive Card Subtrees    │
│  • IntersectionObserver (320px)      │  │  • Direct Pointer Tilt & Glow  │
│  • Off-thread Image.decode() Cache   │  │  • CyberTypingDescription      │
│  • Instant Tab Cross-Fade (16:10)    │  │    (Interval + Memoized Regex) │
└──────────────────────────────────────┘  └────────────────────────────────┘
```

- **Data Model & State**:
  - **Spotlight Decode Cache**: A module-level `Set<string>` tracking which `PROJECT_DETAILS` image URLs have already been pre-decoded off-thread so repeated renders or tab switches never re-decode.
  - **Memoized Highlight Matcher**: `CyberTypingDescription` computes its highlight `RegExp` and lowercase lookup `Set` via `useMemo` keyed on `highlights`, keeping the character-interval state updates (`displayedLength`) lightweight and layout-isolated via CSS containment.
- **Interactive Component & State Mapping**:
  - `ProjectOrbitSelector`: When the spotlight shell intersects within `320px` of the viewport (or when a user hovers any tab button), it triggers off-thread `img.decode()` for the target and remaining spotlight artworks, ensuring instant tab transitions with explicit `width={1200}` and `height={750}` geometry.
  - `CyberTypingDescription`: Retains its `setInterval` typing cadence while isolating paint/layout inside `.cyber-typing-block` (`contain: layout style`) and using a pre-compiled `useMemo` regex.
  - Section & Card Surfaces (`index.css`): Enhances `.project-spotlight-shell`, `.project-card`, `.collection-card`, `.cyber-typing-block`, and walkthrough containers with GPU compositing and layout containment rules.
