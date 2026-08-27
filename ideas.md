# Design Directions

## Approach 1 — Obsidian Studio
**Very Brief Intro:** An editorial, asymmetric studio portfolio set against near-black surfaces, with ultraviolet luminescence used as a precise visual signal rather than decoration. It should feel like a developer’s craft journal after dark.

**Probability:** 0.07

## Approach 2 — Museum Interface
**Very Brief Intro:** A pale, museum-like spatial layout with oversized type, archival labels, and restrained monochrome accents. It would frame projects as artifacts rather than product cards.

**Probability:** 0.04

## Approach 3 — Signal Archive
**Very Brief Intro:** A tactile, technical index inspired by field notebooks and terminal ephemera, using muted ink colors, code-like annotations, and modular evidence blocks. The tone is intelligent, grounded, and methodical.

**Probability:** 0.09

# Chosen Direction — Obsidian Studio

## Design Movement
**Neo-brutalist editorial meets cinematic glassmorphism.** The layout will borrow the strong hierarchy, offset composition, framed type, and small-label precision of contemporary editorial sites, then translate those devices into a nocturnal digital studio context.

## Core Principles
1. **Cinematic restraint:** Black negative space and shadow do most of the work; violet illumination only identifies hierarchy, focus, and motion.
2. **Evidence-led storytelling:** Metrics, project outcomes, dates, and process notes appear as compact signals that make the portfolio feel authored and credible.
3. **Asymmetric rhythm:** Important elements break out of a central column through side notes, vertical rules, oversized type, and staggered content blocks.
4. **Motion with purpose:** Transitions reveal reading order and depth. They must never compete with the content or make the experience feel like a template.

## Color Philosophy
The base will be **Obsidian Ink** (`#09090F`), a blue-violet black that gives bright text a cinematic, high-contrast stage. **Ultraviolet** (`#8B5CF6`) is the signature color: an ownable energy marker used in rings, underlines, timelines, and hover transitions. Pale lilac and warm white will keep text readable, while rose light appears only as a rare optical flare within gradients. The intent is instrument-panel precision, not a generic neon scheme.

## Layout Paradigm
The page is designed as a **vertical reel**. A narrow left rail establishes section metadata on large screens; the main content runs as a sequence of offset panels, large typographic beats, and horizontally displaced project specimens. The hero uses an editorial two-column imbalance, with the identity block weighed to the left and an art-directed portrait-like abstract composition to the right.

## Signature Elements
1. **Violet signal line:** A living, glowing line runs through the experience and education chronology and echoes in active navigation.
2. **Index labels:** Compact all-caps labels with serial-number styling identify sections, projects, metrics, and capabilities.
3. **Spectral glass panels:** Semi-transparent panels use subtle inner borders and a violet-to-transparent sheen rather than standard rounded-card styling.

## Interaction Philosophy
Every interaction should communicate proximity to a designer-developer’s work: navigation glides to a clear chapter, project surfaces lean toward the pointer, and controls answer with a measured magnetic pull. Keyboard focus receives the same violet signal treatment as pointer hover.

## Animation
Use short, spring-like transitions for controls and scroll-triggered staggered reveals for major content groups. Animate opacity and transforms only. Background orbs drift slowly at long intervals; project cards use restrained pointer tilt. The interface will respect `prefers-reduced-motion` by removing continuous motion, cursor effects, magnetic movement, and scroll-linked transforms while retaining immediate visual states.

## Typography System
**Space Grotesk** drives display headings with tight tracking and weight contrast, making names and project titles architectural. **Manrope** supplies readable body copy, metadata, and interface labels. Headline scale follows an editorial contrast: massive hero text, strong section statements, then compact, uppercase data labels with spaced lettering.

## Brand Essence
**S Manoj Prabhu is a detail-driven developer-designer portfolio for translating intentional interface thinking into production-ready digital experiences.**

Personality: **precise, cinematic, ambitious.**

## Brand Voice
Headlines are declarative and craft-oriented; CTAs are verbs that expose work rather than generic invitations. Microcopy should sound observant and specific, never like startup filler.

Example lines:

> Interfaces that feel obvious — because the hard decisions happened earlier.

> Open the work. Follow the system behind it.

## Wordmark & Logo
The mark is an interlocked **SMP monogram** formed from three angled signal strokes inside an imperfect violet orbit. It is paired with the name in Space Grotesk rather than a generic default wordmark. The header uses the mark at a clear, recognizable size; the same graphic becomes the favicon.

## Signature Brand Color
**Ultraviolet Signal — `#8B5CF6`**

## Style Decisions

- Each major chapter must break the default centered-template rhythm with at least one offset: a left signal rail, displaced specimen panel, section label, or side-note.
- Ultraviolet is functional wayfinding: active navigation, chronology points, proof numerals, orbital identity marks, and primary actions only. It is never used as a general neon fill.
- The SMP monogram is a recurring studio seal. Its angled three-stroke orbit language must connect the hero composition, navigation identity, and footer.
- Ultraviolet effects are reduced when they do not identify navigation, chronology, proof, project focus, or the SMP mark; non-functional HUD decoration remains visually secondary.
- Each project specimen leads with one legible outcome, one dominant visual artifact, and one concise process note before secondary technical detail.
- The SMP three-stroke orbit visibly informs the hero, project framing, navigation identity, and footer seal as one coherent studio geometry.
