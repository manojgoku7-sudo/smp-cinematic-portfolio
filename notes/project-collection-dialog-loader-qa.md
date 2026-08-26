# Project Collection Dialog Loader — QA Notes

The MyJob AI Radar card click immediately renders the dedicated dialog loader before its full details settle. Live verification confirms the loader text reads “Aligning project signal — Preparing MyJob AI Radar,” and the embedded spinner exposes the accessible `role="status"` loading label.

After the brief 260 ms handoff, the complete existing MyJob details return with its existing Live Demo action intact. The loader’s visible close control dismisses the dialog cleanly. No Project Collection source-code or repository action is present.

The Anime Pinterest Automation Bot was also checked after the image-priority refinement. Its selected artwork is requested immediately within the loader at `fetchpriority="high"` with asynchronous decoding, then is fully decoded (1440 px natural width) and receives the ready-state fade in the complete dialog. Its existing no-source-link policy remains intact.

At the user’s request, the approved baseline fan was restored from the checkpoint immediately before the six recent card-level enhancements. The color legend, per-card accent treatments, signal thread, active ripple, and white-line overlay are absent; all four original cards and the existing MyJob dialog action remain available. The initial MyJob check entered its brief loader correctly, then completed with its supplied Live Demo present and no source link introduced.

The new baseline-preserving card-edge glint was checked on Card 02. Its focused card runs `collection-card-edge-glint` once for 0.34 seconds, using a masked white conic highlight along the perimeter (`inset: -1.28px`) rather than covering the artwork; the card remains focused and its scrim remains available.

With the global Motion control paused, the edge glint resolves to `display: none`; the original live motion state restores correctly. The glint is desktop-only, so the 390 × 844 collection remains unchanged. No browser-console warnings were recorded.

The desktop hover/focus elevation now uses a 0.42-second `cubic-bezier(.22, .8, .32, 1)` transition. Card 03 retained its original rotated physical-fan transform while moving outward on keyboard focus, preserving its accessible name and violet border state.

A live desktop pointer check also brought Card 02 smoothly forward without changing any card position, artwork, label, or visible fan geometry. The other three cards remained readable and available behind it.

The refined transition is scoped to desktop hover-capable screens with no reduced-motion preference; the existing reduced-motion rules remain present. The Motion control entered its paused state during verification and was restored to “Motion live” afterwards.

For the tactile press validation, Card 03 was positioned in view with its refined 0.42-second hover transition intact and a one-time pointer-down probe armed before its existing detail-dialog action.

On the live Card 03 click, the pointer-down state was active and used the new 0.12-second response with a compact 16 px outer shadow plus tactile inset shadow. The existing MyJob dialog opened successfully with its permitted Live Demo still available; the dialog-only source-action check is being isolated from unrelated page links.

The dialog then closed cleanly. The final style inspection confirms the tailored Card 03 press transform, the compact mobile press fallback, and the reduced-motion `transform: none` safeguard are all present.

Desktop dialog inspection confirms the decoded Anime artwork is fully visible, contained, and readable beside the unchanged detail content. The portfolio was also captured at a 390 × 844 phone viewport after the refinement; the existing responsive collection presentation remains intact.

For the adjacent-card prefetch check, selecting Card 01 left Card 02’s 1440 px artwork completely available during the first dialog’s loading handoff. After the first dialog had closed, Card 02 opened with its complete 1440 px artwork and the ready-state fade applied; its no-source-link policy also remains intact.

The mobile collection was captured at 390 × 844 after the directional refinement. A forward-and-reverse mobile scroll simulation kept the four-card stage stable and updated the centred snap indicator cleanly, allowing the prefetch effect to choose the following or preceding artwork according to browse direction.

Directional prefetching is bounded to genuine adjacent cards: it does not wrap from the last card back to the first or from the first card back to the last. The live collection still exposes all four snap indicators and all four card actions, with no browser-console warnings.

Touch-intent verification on the mobile collection confirmed that a slow horizontal movement created no prefetch request, while a fast forward gesture created exactly one low-priority request for Card 02’s artwork before the swipe completed. This preserves ordinary taps and deliberate slow drags while preparing the likely next dialog on a clear, fast swipe.

The touch-intent threshold is therefore confirmed; a follow-up direct-card dialog verification is being resolved separately after its initial scripted timing check did not observe the dialog state.

The direct-card verification resolved successfully: the Anime Pinterest Automation Bot dialog is visible with its full 1440 px decoded artwork and ready-state fade intact, and no Project Collection source link is present. The earlier scripted observation was timing-related rather than a dialog failure.

The live browser exposes Network Information signals for adaptive prefetching: `saveData`, `effectiveType`, `downlink`, and `rtt`. The verification environment reports `4g`, 10 Mbps downlink, `saveData: false`, and 0 ms RTT, enabling the fast-network path while constrained profiles can be handled deterministically.

Initial constrained-profile testing confirmed that low-velocity 3G movement and a save-data-enabled gesture issued no speculative artwork requests. The qualified 3G request path is being retested against an unprefetched adjacent artwork to isolate it from any already-warmed image cache.

The isolated 3G retest confirmed that a qualified, clearly fast swipe still issued exactly one low-priority request for the unprefetched MyJob AI Radar artwork. Together with the save-data suppression result, this verifies the intended adaptive behavior: no speculative load for data-saving or insufficient intent, with a stricter but available path on cautious connections.

The new collection light sweep is pointer-gated on desktop. A programmatic focus check confirmed the card remains keyboard-focusable, while the CSS pseudo-class did not activate in that non-keyboard focus state; an actual hover check is being used to validate the visual sweep.

The desktop hover check kept the approved four-card fan, labels, and interaction rail stable while the active card was brought forward. The light-sweep pseudo-element is being read directly from its computed animation state to complete the validation.

The first pointer position fell just outside Card 02’s current bounds, so it did not activate the hover-only sweep. Card bounds were measured and the pointer validation is being retargeted to the visible Card 02 centre.

The retargeted Card 02 hover activated the new `collection-card-light-sweep` animation at its intended 0.56-second duration. The card also retained its established physical pull-forward behavior; all four collection cards remain available.

The global motion-pause control check confirmed the new sweep rule is present. The current click did not enter the paused state, so the existing control wiring is being inspected before the safeguard result is recorded.

The established motion control was then invoked directly and entered the expected `.page-shell.motion-paused` state with `aria-pressed="true"` and the visible “Motion paused” label. The sweep’s pause selector sits inside this same established motion-paused scope; the control is being restored to its prior live state after verification.

The control was restored successfully to its prior live state (`aria-pressed="false"`, “Motion live”). No browser-console warnings were recorded through the light-sweep and motion-control checks.

The Project Collection loader now renders the dialog aperture successfully: it exposes three rings, runs `collection-dialog-aperture-open` for 0.42 seconds, retains the existing loader, and keeps the close control visible throughout the handoff.

With the existing Motion control paused, the aperture receives its `is-static` state and its ring animation resolves to `none`, while the close control remains visible. The control was restored to its prior live state afterwards. The reduced-motion CSS fallback also removes the aperture entirely.
