# Hero Memoji Live DOM Proof

Date: 2026-08-28

## Exact source

### Ref declaration (`client/src/pages/Home.tsx`)

```tsx
const heroMemojiPupilRefs = useRef<[HTMLImageElement | null, HTMLImageElement | null]>([null, null]);
```

### Exact rendered JSX (`client/src/pages/Home.tsx`)

```tsx
<div
  ref={heroMemojiRef}
  className="hero-memoji-portrait"
  onPointerEnter={beginHeroMemojiHover}
  onPointerMove={followHeroMemojiGaze}
  onPointerLeave={resetHeroMemojiGaze}
  onPointerDown={noteHeroMemojiTouchStart}
  onPointerUp={handleHeroMemojiPointerUp}
>
  <span className="hero-memoji-ground-shadow" aria-hidden="true" />
  <span className="hero-memoji-backdrop" aria-hidden="true" />
  <img
    className="hero-memoji-reference-scene"
    src="/manus-storage/manoj-hero-transparent-memoji-glasses-a_0af8bf1f.png"
    alt="Stylized light-skinned developer Memoji with glasses peeking over a light-gray laptop"
  />
  <span className="hero-memoji-brow-window left" aria-hidden="true">
    <img src="/manus-storage/manoj-hero-transparent-memoji-glasses-a_0af8bf1f.png" alt="" />
  </span>
  <span className="hero-memoji-brow-window right" aria-hidden="true">
    <img src="/manus-storage/manoj-hero-transparent-memoji-glasses-a_0af8bf1f.png" alt="" />
  </span>
  <span className="hero-memoji-pupil-window left" aria-hidden="true">
    <img
      ref={(node) => { heroMemojiPupilRefs.current[0] = node; }}
      data-memoji-pupil="left"
      src="/manus-storage/manoj-hero-transparent-memoji-glasses-a_0af8bf1f.png"
      alt=""
    />
  </span>
  <span className="hero-memoji-pupil-window right" aria-hidden="true">
    <img
      ref={(node) => { heroMemojiPupilRefs.current[1] = node; }}
      data-memoji-pupil="right"
      src="/manus-storage/manoj-hero-transparent-memoji-glasses-a_0af8bf1f.png"
      alt=""
    />
  </span>
  <span className="hero-memoji-lid left" aria-hidden="true" />
  <span className="hero-memoji-lid right" aria-hidden="true" />
  <span className="hero-memoji-glasses-layer" aria-hidden="true">
    <i className="hero-memoji-glasses-glint left" />
    <i className="hero-memoji-glasses-glint right" />
  </span>
</div>
```

### Exact tracking and reset logic (`client/src/pages/Home.tsx`)

```tsx
function followHeroMemojiGaze(event: ReactPointerEvent<HTMLDivElement>) {
  if (reduceMotion || motionPaused || lowDataMode || event.pointerType !== "mouse" || window.innerWidth < 768) return;
  const portrait = heroMemojiRef.current;
  if (!portrait) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
  const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
  portrait.classList.add("is-gazing");
  const pupilOffsetX = (x * 5.85).toFixed(2);
  const pupilOffsetY = (y * 2.35).toFixed(2);
  heroMemojiPupilRefs.current.forEach((pupil) => {
    if (pupil) pupil.style.transform = `translate3d(${pupilOffsetX}px, ${pupilOffsetY}px, 0)`;
  });
  portrait.style.setProperty("--hero-memoji-brow-x", `${(x * 1.5).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-brow-y", `${(y * .9).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-tilt-x", `${(y * -1.1).toFixed(2)}deg`);
  portrait.style.setProperty("--hero-memoji-tilt-y", `${(x * 1.65).toFixed(2)}deg`);
  portrait.style.setProperty("--hero-memoji-shadow-x", `${(x * -4.6).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-shadow-y", `${(y * 2.8).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-ground-shadow-x", `${(x * -3.35).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-ground-shadow-y", `${(y * 1.45).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-glint-x", `${(x * 1.75).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-glint-y", `${(y * .85).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-backdrop-x", `${(x * 14).toFixed(2)}px`);
  portrait.style.setProperty("--hero-memoji-backdrop-y", `${(y * 9).toFixed(2)}px`);
}

function resetHeroMemojiGaze() {
  const portrait = heroMemojiRef.current;
  if (!portrait) return;
  if (heroMemojiHoverTimer.current !== null) window.clearTimeout(heroMemojiHoverTimer.current);
  heroMemojiHoverTimer.current = null;
  portrait.classList.remove("is-gazing");
  portrait.classList.remove("is-settled");
  heroMemojiPupilRefs.current.forEach((pupil) => pupil?.style.removeProperty("transform"));
  portrait.style.removeProperty("--hero-memoji-brow-x");
  portrait.style.removeProperty("--hero-memoji-brow-y");
  portrait.style.removeProperty("--hero-memoji-tilt-x");
  portrait.style.removeProperty("--hero-memoji-tilt-y");
  portrait.style.removeProperty("--hero-memoji-shadow-x");
  portrait.style.removeProperty("--hero-memoji-shadow-y");
  portrait.style.removeProperty("--hero-memoji-ground-shadow-x");
  portrait.style.removeProperty("--hero-memoji-ground-shadow-y");
  portrait.style.removeProperty("--hero-memoji-glint-x");
  portrait.style.removeProperty("--hero-memoji-glint-y");
}
```

## Exact pupil CSS

Only `client/src/interaction-fluidity.css` touches `.hero-memoji-pupil-window` or its child `img` in the current source tree:

```css
.hero-memoji-pupil-window {
  position: absolute;
  z-index: 2;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  background: radial-gradient(ellipse 3.92% 4.18% at var(--hero-memoji-iris-x) 49.2%, #fffaf1 0%, #fff7ed 76%, rgb(255 239 221 / .92) 89%, transparent 100%);
  -webkit-clip-path: ellipse(4.02% 4.3% at var(--hero-memoji-iris-x) 49.2%);
  clip-path: ellipse(4.02% 4.3% at var(--hero-memoji-iris-x) 49.2%);
  -webkit-mask-image: radial-gradient(ellipse 4.18% 4.48% at var(--hero-memoji-iris-x) 49.2%, #000 73%, rgb(0 0 0 / .82) 89%, transparent 100%);
  mask-image: radial-gradient(ellipse 4.18% 4.48% at var(--hero-memoji-iris-x) 49.2%, #000 73%, rgb(0 0 0 / .82) 89%, transparent 100%);
}

.hero-memoji-pupil-window img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: contain;
  object-position: center bottom;
  filter: brightness(.93) contrast(1.3);
  transform: translate3d(0, 0, 0);
  transform-origin: 50% 50%;
  transition: transform 230ms cubic-bezier(.22, 1, .36, 1);
  will-change: transform;
}

.hero-memoji-portrait.is-gazing .hero-memoji-pupil-window img {
  transition-duration: 185ms;
  transition-timing-function: cubic-bezier(.22, .88, .32, 1);
}

.hero-memoji-pupil-window.left { --hero-memoji-iris-x: 42.0%; }
.hero-memoji-pupil-window.right { --hero-memoji-iris-x: 57.4%; }
```

The only responsive rule that touches the pupil window is:

```css
@media (max-width: 767px), (prefers-reduced-motion: reduce) {
  .hero-memoji-ground-shadow,
  .hero-memoji-backdrop,
  .hero-memoji-greeting,
  .hero-memoji-brow-window,
  .hero-memoji-pupil-window,
  .hero-memoji-lid,
  .hero-memoji-glasses-layer { display: none; }
}
```

## Live browser output

A live Chromium DevTools Protocol probe queried the actual rendered DOM, moved the real pointer to opposite sides of the portrait, waited for the CSS transition, then read `style.transform` and `getComputedStyle(...).transform` from the actual `[data-memoji-pupil]` nodes.

### Initial rendered DOM

```text
portrait: true
pupilCount: 2
pupil[0]: inline="", computed=matrix(1, 0, 0, 1, 0, 0), display=block, opacity=1, visibility=visible, animation=none, transition=transform
pupil[1]: inline="", computed=matrix(1, 0, 0, 1, 0, 0), display=block, opacity=1, visibility=visible, animation=none, transition=transform
```

### Pointer moved to the left side

```text
portraitClass: hero-memoji-portrait is-gazing
pupil[0]: inline="translate3d(-5.15px, 0.09px, 0px)", computed=matrix(1, 0, 0, 1, -4.91254, 0.09)
pupil[1]: inline="translate3d(-5.15px, 0.09px, 0px)", computed=matrix(1, 0, 0, 1, -4.91254, 0.09)
--hero-memoji-brow-x: -1.54px
--hero-memoji-glint-x: -1.54px
```

### Pointer moved to the right side

```text
portraitClass: hero-memoji-portrait is-gazing
pupil[0]: inline="translate3d(5.08px, 0.09px, 0px)", computed=matrix(1, 0, 0, 1, 5.08, 0.09)
pupil[1]: inline="translate3d(5.08px, 0.09px, 0px)", computed=matrix(1, 0, 0, 1, 5.08, 0.09)
--hero-memoji-brow-x: 1.52px
--hero-memoji-glint-x: 1.52px
```

### Reset after pointer leave

```text
pupil[0]: inline="", computed=matrix(1, 0, 0, 1, 0.00723434, 0.000128167)
pupil[1]: inline="", computed=matrix(1, 0, 0, 1, 0.00723434, 0.000128167)
```

The tiny non-zero reset matrix is the final sub-pixel frame of the 230 ms CSS transition; the inline transform has already been removed. It settles to the base transform immediately afterward.

## Actual layer order

The rendered `.hero-memoji-portrait` children are ordered as follows:

| DOM order | Element | Computed z-index | Relevant state |
|---:|---|---:|---|
| 1 | `.hero-memoji-ground-shadow` | 0 | Decorative shadow |
| 2 | `.hero-memoji-backdrop` | 0 | Decorative glow |
| 3 | `.hero-memoji-reference-scene` | 1 | Static base artwork, including the baked-in iris artwork |
| 4 | `.hero-memoji-brow-window.left` | 2 | Independent eyebrow crop |
| 5 | `.hero-memoji-brow-window.right` | 2 | Independent eyebrow crop |
| 6 | `.hero-memoji-pupil-window.left` | 2 | Fixed left socket aperture; child image is visible and transformed |
| 7 | `.hero-memoji-pupil-window.right` | 2 | Fixed right socket aperture; child image is visible and transformed |
| 8 | `.hero-memoji-lid.left` | 3 | Blink contour, normally opacity 0 |
| 9 | `.hero-memoji-lid.right` | 3 | Blink contour, normally opacity 0 |
| 10 | `.hero-memoji-glasses-layer` | 4 | Reflection-only glints |

The static base artwork is below the pupil windows (`z-index: 1` versus `z-index: 2`). The eyelid contour is above the pupil windows only during blinking, and the glasses reflection layer is above both, as intended. No second static DOM pupil layer exists; the static iris pixels are part of the base image asset.

## Conclusion

The live evidence does not show a missing ref, inactive handler, transform override, parent cancellation, animation reset, or covering layer. The actual two pupil nodes receive and render opposite transforms, and the opposite-gaze browser captures show a measurable eye-region difference. The current source therefore does not contain the specific DOM/binding failure described in the request. No application-source repair was applied during this evidence pass; only the QA record and checklist were updated.

The direct proof above is the equivalent of the DevTools Elements/Styles inspection: the matched `.hero-memoji-pupil-window img` rule contains `transform: translate3d(0, 0, 0)`, the live inline style changes to the pointer-specific `translate3d(...)`, the computed matrix follows it, and no rule is marked disabled or overridden by `!important`.
