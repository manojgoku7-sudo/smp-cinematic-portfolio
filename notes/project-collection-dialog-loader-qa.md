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

The dialog-close refinement is present as a dedicated `collection-dialog-dismiss` closed-state animation. Card 03 was positioned for live close testing; the reduced-motion rule will be checked through its media scope rather than stylesheet text serialization.

The MyJob dialog opened with its existing close control available. A mutation observer is armed against the dialog’s `data-state` transition so the actual closed-state animation can be verified before delayed content cleanup.

The first live close exposed a controlled-state handoff issue: the direct close control began delayed cleanup but did not update the dialog’s local open state. The close callback was corrected to update both states before the delayed project cleanup, and the live close test is being repeated.

After the correction and a fresh preview load, Card 03 was available and positioned for the repeat close-transition validation.

The repeat MyJob dialog opened with `data-state="open"` and its close control available. A fresh closed-state observer is armed against the corrected lifecycle.

The repeat close returned the visible four-card fan immediately, but the first post-close scripted state read remained inconclusive. The retained dialog state is being inspected directly before finalizing the lifecycle verification.

The close lifecycle now uses an explicit `is-closing` visual phase with dedicated dismissal styles. A fresh preview confirms Card 03 and the controlled close styles are ready for final live validation.

The final live test confirms the dialog enters `is-closing` while remaining open for its visible `collection-dialog-dismiss` phase. The delayed cleanup timing is being measured beyond the initial 290 ms sampling window before focus restoration is finalized.

The end-to-end MyJob test confirms the dialog remains visually present with `collection-dialog-dismiss` at 20 ms and 130 ms, clears after the close phase, and restores focus to “Open details for MyJob AI Radar.”

With Motion paused, the dialog skips the custom close animation and clears immediately; focus restoration is scheduled after the dialog primitive’s own static close cleanup before the final paused-motion check.

The paused-motion close correctly clears the dialog and returns Motion to live, but the first 380 ms focus sample still resolves to the page body. The static cleanup’s focus ordering is being refined separately from the already verified live-motion close path.

The static close now retains the originating card index and resolves the card from the mounted collection after portal cleanup, avoiding reliance on an event-held element reference.

Final verification passed: live Motion uses the controlled visual dismissal before cleanup, while paused Motion skips that nonessential animation. Both paths close the MyJob dialog successfully, restore focus to its originating collection card, and return the global Motion control to live.

For the image-entry timing refinement, the MyJob dialog was opened through its existing loader. The first 460 ms probe still reflected the loader handoff, so selected-artwork decode timing is being allowed to complete before inspecting the tuned visual transition.

The completed MyJob handoff now resolves the selected visual and its supplied Live Demo. The artwork uses the intended 0.34 s opacity entry after a 0.06 s beat, with a 0.54 s scale settle after 0.02 s; the settled dialog remains readable and unobstructed.

The Motion-pause probe returned the portfolio to its live state with no dialog retained. The direct paused opening sequence will be checked separately after a fresh interaction, rather than relying on a chained close-and-reopen probe.

The live page was confirmed dialog-free before the final pause probe. The page shell now reports the paused state, and the control is being resolved by its rendered label so the check can complete and restore Motion live.

The paused MyJob dialog resolves its selected visual and retained Live Demo correctly, but the computed artwork transition remains present. The pause rule is being strengthened so the global control also suppresses this newly tuned entry transition.

Final image-entry verification passed. Live Motion uses the 0.06 s delayed opacity reveal and 0.02 s delayed scale settle; with Motion paused, the portal-rendered dialog receives `is-static` and reports a 0 s transition with no transform. The dialog then closed successfully, focus returned to MyJob, and Motion was restored live.

The loader-copy cadence now runs as intended: “Aligning project signal” enters over 0.16 s after 0.025 s, followed by the project-specific preparation line over 0.2 s after 0.075 s. The selected artwork handoff is being allowed to finish before final dialog verification.

The loader handed off cleanly to the ready MyJob dialog with its Live Demo intact. Under Motion pause, the dialog receives `is-static` and both loader-copy animations resolve to `none`; the global Motion state is being restored after the check.

The new progress rail mounts with the intended 0.46 s progress-settle animation and 0.045 s start beat while the MyJob loader is active. Its runtime fill state and completed dialog handoff are being checked separately before finalizing the feedback.

The MyJob loader then handed off normally to decoded artwork and its supplied Live Demo. Under Motion pause, the dialog uses `is-static`: the progress animation is `none` and the rail holds a restrained 0.82 fill state. Motion is being restored after this static check.

The dialog close control is present during the MyJob handoff and retains its existing border, background, and transform transition. The new scoped active press rule is loaded; the complete visual handoff and actual close/focus lifecycle are being exercised next.

The MyJob detail completed with its Live Demo present. Closing through the refined control completed the existing dismissal, removed the dialog, returned focus to MyJob, and left Motion live. The press response is static in the dialog’s `is-static` Motion-pause state and under reduced-motion preferences.

Project Collection audit: all four cards render, the third card accepts keyboard focus, their baseline transforms and desktop 0.42 s card transitions are present, and no failed resource entries were detected. The active card’s stacking requires a final transition refinement so focus/hover elevation remains clearly above the physical fan while retaining the approved geometry.

The refined desktop focus path now raises the active card wrapper to z-index 60 and uses the normalized 0.36 s card transition. A direct MyJob card selection continues into its existing detail dialog; the mobile swipe presentation and the motion-safe paths are being checked next.

MyJob continued to complete its existing dialog handoff after the card-motion normalization. Its close control removed the dialog and returned focus to the originating card, confirming the refined fan interaction has not regressed the dialog lifecycle.

The desktop normalization is isolated to the 1024 px-and-up interaction path, so the mobile swipe layout remains structurally unchanged. Full-page mobile review completed with the collection content and downstream portfolio sections retained; no new browser-console or resource errors were found during the card audit.

Opening-handoff trace: every collection card now holds a short `is-opening` press state before its dialog mounts, then reaches the correct existing loader and loading title. Cards 01–03 cleared cleanly and restored focus. Card 04 cleared but did not report focus restoration in the automated sequence, so its close focus path is being isolated before finalizing.

With the original Smart Aroma trigger explicitly focused, the close sequence removed its dialog and correctly returned focus to Card 04. An initial Motion-pause probe sampled before the new 120 ms handoff could mount, so the static path will be rechecked only after its card state has settled.

Final static-motion check passed: the global control applied the paused state, Card 02 bypassed `is-opening`, opened its dialog directly without the loader, received `is-static`, closed cleanly, and returned the global control to live motion.

Dialog stability check: the Smart Aroma detail remained open after a body-level pointer move and an overlay-targeted outside-pointer probe. The intentional close control still dismissed the dialog and restored focus to Card 04.

Final lifecycle stress check: Smart Aroma stayed open during 24 repeated page-level pointer moves, background scroll events, and internal dialog scrolling. Its complete title remained mounted, and the deliberate close control cleared the dialog and restored focus to Card 04.

Direct-handoff verification passed. Cards 01–04 now mount their existing loaders immediately with no staged opening class. Smart Aroma stayed open through 80 left-to-right pointer and mouse-move events, then closed only by its explicit close control with focus returned to Card 04.

Dialog navigation initial probe confirmed the navigator appears after the existing loader resolves. The first automated click sampled while the loader was still present, so the boundary test is being rerun after the controls have mounted.

Previous and Next controls rendered correctly for MyJob and exposed descriptive labels for its adjacent projects. The first/last boundary test, full ordered traversal, return navigation, and close focus restoration all passed. The controls are now placed below the dialog header so they remain immediately discoverable without scrolling the brief.

Visual review confirmed the MyJob header shows the compact Previous / Project 03 / 04 / Next index immediately beneath the title area, while its project brief remains fully scrollable.

Narrow-layout check confirmed the responsive two-row navigation arrangement keeps the project counter above both buttons. Measured bounds showed clear vertical separation from the controls and a gap between Previous and Next, eliminating the reported overlap.

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

The new top-of-dialog Back to collection breadcrumb is visible alongside the existing project heading and Previous/Next controls. On MyJob AI Radar, its accessible label closed the dialog cleanly and returned the viewport to the Project Collection fan; MyJob’s Live Demo and the no-source-link policy remained unchanged.

Post-action validation found no dialog remaining, focus restored to “Open details for MyJob AI Radar,” and the Project Collection heading aligned at the top of the viewport (within 28 px), confirming the breadcrumb preserves the established close-focus lifecycle.
