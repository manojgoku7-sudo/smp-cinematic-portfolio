# Project Collection Dialog Loader — QA Notes

The MyJob AI Radar card click immediately renders the dedicated dialog loader before its full details settle. Live verification confirms the loader text reads “Aligning project signal — Preparing MyJob AI Radar,” and the embedded spinner exposes the accessible `role="status"` loading label.

After the brief 260 ms handoff, the complete existing MyJob details return with its existing Live Demo action intact. The loader’s visible close control dismisses the dialog cleanly. No Project Collection source-code or repository action is present.

The Anime Pinterest Automation Bot was also checked after the image-priority refinement. Its selected artwork is requested immediately within the loader at `fetchpriority="high"` with asynchronous decoding, then is fully decoded (1440 px natural width) and receives the ready-state fade in the complete dialog. Its existing no-source-link policy remains intact.

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
