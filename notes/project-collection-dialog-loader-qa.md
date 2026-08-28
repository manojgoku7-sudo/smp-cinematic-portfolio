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

The Project Collection fan remained fully visible and interactive during the initial desktop hover review after the behind-the-fan signal-sweep addition. Motion-state and interaction-boundary checks are recorded with the final verification.

The desktop sweep resolves to the intended `collection-behind-fan-signal-sweep` animation for 0.82 seconds, with z-index 0 and `pointer-events: none`; the collection cards retain `pointer-events: auto`. The first scripted Motion-control lookup did not enter the paused page state, so the established control is being retried through its live accessible label before finalizing that safeguard.

The live Motion control was then exercised successfully: the page entered its paused state and the engaged signal sweep reported `animation-play-state: paused`. Live motion was restored afterward, and the temporary active state was cleared from the fan.

After the sweep verification, MyJob AI Radar still opened through its established dialog handoff and exposed its permitted Live Demo. Closing through Back to collection returned the stable four-card fan, demonstrating the behind-layer effect does not block card selection or regress the existing dialog route.

The new central selection pulse was sampled 24 ms after selecting MyJob AI Radar: the card carried its short-lived trigger class, the pulse reported `collection-selection-pulse` for 0.48 s with `pointer-events: none`, and the existing dialog was already present. This confirms the feedback begins without delaying the direct dialog handoff.

With Motion paused, Card 01 opened its existing dialog directly while the central pulse correctly reported `none` and the trigger class remained absent. After closing, the dialog cleared, focus returned to Anime Pinterest Automation Bot, and Motion was restored live.

Initial desktop inspection of the Smart Aroma card kept its title and category label readable while the card retained the approved fan placement. The contained vapor layer is being measured directly and checked against the existing Motion safeguard before finalizing.

The Smart Aroma vapor reports `smart-aroma-vapor-drift` at 4.8 s, stays at z-index 0 with pointer events disabled, and remains beneath the title at z-index 4 while the card keeps pointer access. The global Motion control correctly paused the vapor animation and returned the page to live motion afterward.

Smart Aroma still opened its unchanged detail dialog with the expected final-card navigation boundary. Back to collection closed the dialog and returned to the four-card fan, preserving the established project route and focus behavior.

The Smart Aroma selection pulse was sampled 24 ms after a live Card 04 selection: its `is-opening` trigger was present, the dedicated sensor-ring animation reported `smart-aroma-sensor-ring-pulse` for 0.46 s, pointer events remained disabled, and the existing detail dialog had already mounted.

With Motion paused, Smart Aroma opened its existing direct dialog without the `is-opening` trigger or sensor-ring animation. After the safeguard check, the dialog cleared, focus returned to “Open details for Smart Aroma Diffuser,” and Motion was restored live.

Initial desktop hover review of Card 04 retained the protected Smart Aroma title and category label while the temperature readout was prepared as a brief hover-only status cue. Its pseudo-element layering and Motion-control behavior are being verified directly.

The temperature readout has the expected `SENSOR · 22.4°C` content, remains in the title rail at z-index 4, and its shimmer has pointer events disabled. Keyboard focus reached the Card 04 focus-visible state and started the 0.52 s shimmer without opening a dialog; a settled-frame measurement and Motion safeguard remain to be recorded.

After the focus transition settled, the readout reached its intended 0.86 opacity. The global Motion control paused the shimmer successfully and returned to live state afterward; no dialog was opened during either check.

Smart Aroma’s desktop hover readout now exposes `TEMP 22.4°C · HUM 54%` as one quiet companion line. Its matching detail dialog mounts a three-stage Sense → Interpret → Diffuse workflow loop; the packet animation was present at 3.6 s and then corrected to remain pointer-transparent before final Motion and closure checks.

The loop packet now reports pointer events disabled. Closing Smart Aroma and opening MyJob’s project brief did not carry the Smart Aroma workflow into that dialog, confirming the loop is scoped to Card 04. Static-motion is being checked through the remounted dialog element rather than a stale animation reference.

With Motion paused, the remounted Smart Aroma loop carried `is-static`, removed its packet animation, and rendered the packet at its intended 0.72 static opacity. After restoring live motion, Smart Aroma reached its loaded detail title and the workflow was present at the dialog’s natural lower position (`scrollTop` 424 of `scrollHeight` 1361), without modifying the initial dialog layout.

Live placement inspection found the first portal location sat below the visual dialog viewport despite the outer scroll being at its maximum. The loop was therefore moved directly beneath Smart Aroma’s Main features list, where it remains in normal reading order and can be checked without displacing the dialog header or navigator.

The corrected loop is now a child of Smart Aroma’s Main features section and becomes fully visible when that section is reached (`scrollTop` 595). This preserves the dialog’s concise header while presenting the control-loop evidence alongside the related feature list.

Visual review confirmed the contained Diffusion control loop renders with the three concise Sense, Interpret, and Diffuse states beneath Smart Aroma’s feature evidence. Returning through Back to collection closed the dialog cleanly and restored the stable Card 04 browsing state.

Initial live review of Card 04 confirmed the revised plume stays contained in the lower diffuser area and leaves the project title rail unobstructed. Hover/focus opacity, floating motion, and the Motion-control safeguard are being verified directly.

The refined plume reports a 6.4 s `smart-aroma-vapor-drift` animation with pointer events disabled and a live opacity near 0.30. It paused successfully with the global Motion control and resumed its named animation on restoration, without opening a dialog.

Card 04 remained selectable after the smog refinement and completed its normal handoff to the loaded Smart Aroma dialog. The detail retained its workflow loop and visible Back to collection close route, confirming that the upgraded card-only plume does not affect the project brief lifecycle.

The verified Smart Aroma breadcrumb close removed the dialog and restored focus to Card 04, whose expected title content remained present. This confirms the floating-smog layer did not interfere with selection or the established close-focus return route.

The live-smoke correction now runs as `smart-aroma-neck-smoke` over 5.6 s from the lower diffuser-side anchor (`right` 3 px, `bottom` 33 px) with pointer events disabled. The plume and its temperature/humidity readout coexisted without moving or hiding the protected title rail.

The anchored smoke paused under the global Motion control and resumed live state afterward. Card 04 remained selectable while the plume was active and entered its established Smart Aroma dialog handoff, with all dialog navigation and close controls intact.

Smoke brightness was rebalanced from a concentrated glow to a translucent material layer. The live `smart-aroma-neck-smoke-balanced` animation reported a mid-cycle opacity near 0.41 with a 3.6 px blur and pointer events disabled; the adjacent temperature/humidity readout remains independent and unobstructed.

The card preserved a visible Smart Aroma title under keyboard focus, and the balanced plume paused with the global Motion control before resuming the expected `smart-aroma-neck-smoke-balanced` animation.

The diffuser-neck plume cadence was slowed to 6.8 s under normal desktop motion, using the established composited cubic-bezier curve. Its layer remains pointer-transparent and the Smart Aroma title stays present throughout the slower ambient cycle.

The Anime Pinterest card now exposes one brief `anime-pinterest-scan-frame` pass on its real desktop hover state. The masked white-lilac shutter layer is pointer-transparent at z-index 1 while the preserved title rail sits at z-index 4, so the automation title remains readable throughout the pass.

The scan-frame paused with the global Motion control and resumed correctly. Card 01 remained selectable after the effect was introduced, opening its existing project brief with its expected first-project boundary state intact.

Closing the Anime Pinterest brief through Back to collection removed the dialog cleanly and restored focus to the original Card 01 trigger, confirming that the scan-frame change did not disturb the established close lifecycle.

All four collection cards now use an image-only desktop pointer parallax with a maximum 3.5 px horizontal and 2.5 px vertical offset. Synthetic pointer verification populated the expected artwork CSS variables without moving label rails, and a normal mouse-exit event removed the active class and both offsets cleanly.

Motion-paused testing confirmed no parallax class or offsets are applied. Desktop and 390 px responsive reviews preserved the existing physical fan and mobile snap presentation, respectively. Opening MyJob AI Radar remained immediate with its existing Live Demo, and closing via Back to collection restored focus to the original Card 03 trigger.

The desktop artwork parallax is now deeper: the image can travel up to 6.25 px horizontally and 4.25 px vertically, with at most 1.35° X / 1.60° Y plane tilt and a 1.078–1.100 scale settle. All four cards populated those depth variables, left their label rails without inline transforms, and cleared every depth variable on a normal mouse exit. The global Motion pause blocks the expanded effect and restored correctly to live motion.

Final full-page desktop and 390 px mobile reviews retained the approved Obsidian Studio composition and the existing mobile card treatment. The independent desktop visual review marked the direction ready to ship.

The final Project Collection route exposed all four card actions after the refinement, and the live preview console was clear.

All four cards now contain a pointer-transparent, aria-hidden edge-refraction layer beneath the fixed title rails and controls. Desktop pointer coordinates correctly set the localized reflection position (for example, 82% / 26%) and normal mouse exit cleared both refraction coordinates with the shared active state; labels received no inline transform.

Motion pause blocks refraction activation and resolves its layer to `display: none`; the low-data presentation also hides the layer. MyJob AI Radar still opened directly through its established dialog handoff with the allowed Live Demo present, confirming that the refraction layer does not capture selection.

Closing the MyJob dialog through Back to collection removed the dialog and restored focus to the original Card 03 trigger, preserving the established return lifecycle.

Final desktop and 390 px mobile reviews retained the approved physical fan and mobile snap presentation. The independent desktop visual review confirmed the Obsidian Studio direction remains ready to ship.

The final live Project Collection route continued to expose all four card actions, with no console output recorded after the refraction enhancement.

Portfolio-wide responsive audit: the desktop composition preserved the approved cinematic hierarchy. At 768 px, the primary sections reflowed without horizontal clipping, Project Collection adopted its existing two-column mode, and the dense evidence cards remained structurally intact. A final phone review and interaction audit are in progress before the smoothness pass is finalized.

The 390 px review retained the mobile navigation, single-column content flow, and reachable Project Collection presentation. The selected-work route continued to expose its case controls and primary project actions after the pointer-smoothness optimization.

The optimized live pointer probe updated the custom cursor and project orbital finder directly, while the finder still activated at the expected 62% / 34% position and cleared on leave. The final 1280 px and 768 px reviews retained the approved Obsidian Studio hierarchy, readable cards, and stable responsive reflow.

Final phone review retained the single-column content flow and mobile interaction layout. The Project Collection route continued to expose all four card actions after the responsive smoothness refinements.

The final console check remained clear, and MyJob AI Radar still opened directly with its existing dialog navigation and Live Demo action present after the pointer-update optimization.

Closing the responsive-check dialog through Back to collection removed the dialog and returned focus to the original MyJob AI Radar card trigger.

The final smoothness pass moves the custom cursor and selected-work finder directly on their visual elements instead of triggering a page-level React update for every pointer position. Decorative constellation traces are mouse-only and dormant in low-data mode, while collection cards now permit horizontal browsing, vertical page scrolling, and pinch zoom on phones. TypeScript passed after these refinements.

Interaction-fluidity audit confirmed the Project Collection wrapper continues ambient motion during hover and its artwork adopts the intended shorter transform transition. The card shell timing was then isolated for a declaration correction before final validation.

The corrected live card shell now transitions transform and shadow over 440 ms with a smooth custom easing; label rails and the Open cue retain coordinated 300 ms and 220 ms transitions. A live central-card hover continued to preserve the physical fan and all four card actions.

MyJob AI Radar continued to open directly with the calibrated dialog timing and closed cleanly through the Back to collection breadcrumb, preserving the established card collection return path.

Final desktop and 390 px phone presentations retained the established Obsidian Studio hierarchy, card composition, readable single-column mobile flow, and fixed mobile contact action. The final visual pass also confirmed the stronger SMP geometry and lower decorative signal density preserve the project-led reading order.

The final live preview remained available from the portfolio root and the browser console reported no errors after the interaction-fluidity calibration.

Credential-section verification confirmed the requested static orbit treatment loaded with the credential row still available for interaction; the focused record preview was then checked separately.

The Introduction to IoT credential trigger remained enabled and retained its intended button semantics after the static-orbit override.

The open Introduction to IoT credential preview retained its orbit artwork as a static composition: both orbit rings, the accretion detail, and the central pulse reported no animation, while orbital spark elements were hidden. The credential dialog remained open and usable.

The credential preview also closed normally and restored focus to the Introduction to IoT record trigger.

Credential interaction simplification verified that the section no longer exposes credential buttons or a preview dialog trigger. Desktop and 390 px phone presentations retain the compact credential record list without an expanded on-click view.

Final DOM verification confirmed four credential cards, zero credential-card buttons, and no mounted preview dialog.

Work Orbit verification confirmed its inner ring and two concentric halo rings use the new living-spin animations, while the central “Work Orbit” label retains no transform and stays readable.

The live Work Orbit rings reported active animation playback during the initial desktop verification; the existing global motion-pause path was checked separately.

The Work Orbit pause rule is scoped to the same `.motion-paused` state used by the portfolio’s existing motion controls; validation continued through the control’s stable selector.

After allowing the Motion control state to settle, the Work Orbit inner ring and both halo rings paused under “Motion paused” and resumed under “Motion live,” confirming the living-spin enhancement follows the existing safeguard.

Final desktop and 390 px phone visual reviews retained the readable Work Orbit label, connected project-node layout, and approved Obsidian Studio presentation. The desktop visual review found the overall design ready to ship.

The third featured project’s first animated automation walkthrough has been replaced by an illustrated creator-avatar artifact. The avatar loaded inside the existing AI Content Studio card, while the supporting Reliability reel and Open project brief action remained available.

Desktop and 390 px mobile views both preserved the AI Content Studio card’s reading order: outcome signal, creator-avatar artifact, concise process note, and the existing supporting reliability evidence.

The generated avatar asset loaded in the third project’s creator panel at desktop and 390 px widths. The existing Open project brief trigger still opened the YouTube Auto-Uploader & Autonomous AI Content Studio dialog with its original title and content.

Closing the third-project detail dialog returned to the AI Content Studio card cleanly, with the avatar artifact and original project controls still available.

The requested creator-avatar artifact was subsequently removed. The third project now returns directly from its outcome marker to the existing Reliability reel and Open project brief action, with no avatar asset or creator-panel copy rendered. Desktop visual review retained the approved project composition.

The Hero visual now uses the reference-matched compact peeking Memoji scene: hair, eyes, and a light-gray laptop sit centered on a single deep-plum field with a quiet soft glow. The former orbit/grid/starfield overlays are absent. The portrait was further corrected from semi-realistic to clearly 3D Memoji-like: large glossy cartoon eyes, smooth rounded vinyl-like skin, simplified features, and a sculpted graphic hair mass. Final desktop and 390 px mobile checks kept it contained within its visual stage and left the Hero copy, actions, and mobile contact dock unobstructed.

The Hero portrait is now a lighter-skinned Memoji with round glasses. Its dark source edge is softly masked into the Hero instead of presenting as a rectangular panel; desktop verification confirmed the glasses, laptop, and freestanding composition remain visually clear. On fine-pointer desktop input, a lightweight direct-element tilt follows the pointer and resets on exit, without causing page-level React renders. The 390 px phone view remains static, compact, and unobstructed, with the Hero copy, actions, reel, and contact dock all readable.

For the true desktop pupil-tracking refinement, the generated source was mapped directly before positioning the overlays: the left and right eye centres resolve at approximately 30.5% and 66.5% across the 4:3 source, with a shared 39% vertical centre. The overlay coordinates were adjusted to that source geometry before live motion validation.

The measured eye overlays now sit within the Memoji’s glasses at rest. On desktop mouse input, only the pupils move toward the pointer direction through direct CSS variables and ease back to centre on exit; the portrait’s existing small directional tilt remains complementary. The 390 px phone presentation suppresses the nonessential pupil layer, keeping the compact visual static and all Hero controls clear.

The user reported that the first pupil-tracking pass made the two eyes appear uneven. Live desktop DOM measurement confirms the overlay eye bounds are correctly paired at 42.2% and 57.7% across the portrait, sharing the same 54.3% vertical centre. The movement implementation is being reduced and reworked from this equal baseline so both eyes remain visually synchronized.

The revised tracking routine removes competing head rotation and applies one shared horizontal/vertical cursor vector to both pupils. A live far-left pointer exercise set the shared value to -2.58 px horizontally and 0 px vertically; both pupils rendered together within their respective glasses lenses rather than splitting in direction. Final resting-state and mobile checks remain in progress.

A matching far-right pointer exercise set one shared +2.58 px horizontal value and 0 px vertical value. The live browser view showed both pupils travelling right together from the same baseline, without the earlier divergent head rotation. The resting state and 390 px static fallback remain visually clean.

The prior artificial eye graphics were removed after the user reported that their pupil shape remained incorrect. At rest, each new pupil window is now a clipped copy of its exact original source eye, so both iris texture, eye-white shape, and the surrounding glasses geometry are preserved before pointer movement is applied.

The repaired pupil windows now use true 1:1 source-crop positioning rather than a scaled miniature portrait. Resting desktop inspection confirms the original eye whites, pupils, reflections, and glasses sit naturally; a live far-left exercise applies the same -2.58 px vector to both cropped pupils while preserving their shared visual baseline. Phone styling continues to suppress these desktop-only windows.

The enhanced-motion baseline keeps the repaired resting eye treatment intact. The strengthened cursor range is constrained to a shared 4.35 px horizontal and 2.3 px vertical maximum so it remains inside both original eye shapes; a paired skin-tone eyelid layer has been added for the requested periodic desktop blink. The next check exercises both strong movement and the blink-close state.

The live upper-right cursor exercise resolved to a shared +4.32 px horizontal and -2.26 px vertical pupil vector. Both eyes moved together within their original lenses and remained aligned. The blink layers are paired, brief, and desktop-only; they remain absent in the phone and reduced-motion fallbacks.

The blink-close frame was explicitly previewed: both eyelids close symmetrically within the existing round glasses silhouette, then the animation returns to the repaired original eyes. The range and blink are intentionally desktop-only so the static compact phone Hero remains unchanged.

Final validation passed. Desktop cursor tracking reaches the requested stronger shared range while retaining equal eye direction, and both pupil variables clear on exit. The live blink preview resets cleanly to its automatic cadence. At 390 px, the pupil and lid layers are suppressed, leaving the original portrait, Hero actions, reel, and contact dock unobstructed.

The blink cadence is now slowed from 6.4 seconds to a quieter 9.2-second interval. A complementary head tilt uses the same cursor direction as the pupils, capped at 1.15° vertical and 1.85° horizontal rotation so the portrait remains composed at rest. Desktop directional validation and the unchanged mobile fallback are the final checks.

Final desktop directional testing at the lower-right Hero edge produced a shared pupil offset of +4.32 px by +2.28 px and a complementary -1.14° by +1.84° head tilt. The motion remained subtle and coherent with both eyes aligned. The slower blink rhythm is retained, while phones and reduced-motion preferences keep the Hero portrait static.

The refined treatment increases the head response to a maximum 1.60° vertical and 2.45° horizontal tilt. Its soft cast shadow now counter-shifts by up to 4.6 px horizontally and 2.8 px vertically to support the sense of depth. The closed-eye frame has an added curved eyelid crease and warmer skin gradient while the resting Hero remains visually unchanged.

At the lower-right desktop extent, the final interaction resolved to +4.32 px / +2.28 px pupil movement, -1.58° / +2.43° head rotation, and a paired -4.57 px / +2.77 px shadow shift. The portrait retained natural eye alignment and its visual footprint remained clear of the Hero copy and controls.

The hover-only refinement moves pointer listeners from the whole Hero visual onto the portrait itself. At rest, the added glasses-outline layer remains aligned with the original round frames and bridge; it is suppressed on mobile and reduced-motion presentations. Direct-hover testing will confirm the softened tilt, darker shadow, and small independent frame offset work together.

Direct portrait-hover validation at the lower-right edge produced a shared +4.29 px pupil offset, a softer +1.63° horizontal head tilt, a darker -4.54 px counter-shadow, and a deliberately small +1.08 px / +0.54 px glasses offset. The portrait is unreactive across the rest of the Hero, while the layered glasses motion remains subtle enough not to separate visually from the original frames.

At 390 px, the glasses parallax layer, pupil windows, eyelid layers, and portrait-hover response are all absent. The static Memoji remains proportionate below the Hero actions, and the visible mobile contact dock stays unobstructed.

The duplicated ring-and-bridge outline has been removed. Resting desktop inspection now shows the original single pair of glasses only; the replacement layer contains two small light-reflection glints that will travel with a larger, clean independent offset on direct portrait hover.

Live verification confirms no duplicate glasses-ring markup remains and two reflection glints replace it. At the right portrait edge, the glint layer receives a more noticeable +2.22 px horizontal / -0.23 px vertical offset without affecting the original single pair of frames. The resting and hover states retain the clean Memoji appearance, and the reflection layer remains absent on mobile and reduced-motion views.

Final 390 px verification confirms the mobile Memoji has one clean static pair of glasses, with no reflection glints or hover layers visible. The portrait stays centered below the actions and above the contact dock without overlap.

The reflection refinement brightens the diagonal glints, expands them modestly, and raises their possible cursor offset to 3.15 px horizontally and 1.55 px vertically. Entering hover uses a responsive 145 ms curve; clearing portrait hover leaves the longer 280 ms ease-out transition to return the glints gently to their natural centre.

The direct lower-right hover test resolved to +3.12 px / +1.53 px reflection travel across both glints with the intended 145 ms response curve. The brighter highlights remain clean against the original single glasses pair. On portrait exit, the hover class is removed and the 280 ms ease-out return takes over, giving the reflections a smoother natural settle instead of a snap.

The depth treatment adds violet-blue tinted lens glints and a low-opacity elliptical violet background glow directly behind the Memoji. At rest, both preserve the clean one-pair-of-glasses composition and do not introduce a rectangular stage. The backdrop is designed to shift only under direct desktop portrait hover, with all new layers absent in the compact mobile presentation.

The upper-left direct-hover test produced a coordinated -3.11 px / -1.52 px tinted lens-reflection shift and -9.86 px / -6.87 px backdrop-glow shift. The glow remains soft and low opacity behind the avatar, supporting depth without obscuring the original portrait or Hero copy. All response variables clear when direct portrait hover ends.

At 390 px, the tinted lens glints and responsive backdrop glow remain suppressed. The static compact Memoji retains its original single glasses pair and stays visually contained between the Hero actions and the mobile contact dock.

The new dynamic hover refinement adds a restrained 1.035 scale only while the direct-portrait `is-gazing` state is active. Resting desktop inspection confirms that the Memoji’s size, one-pair-of-glasses appearance, tinted reflections, and backdrop remain unchanged until direct hover begins.

Direct portrait-hover validation confirms the `is-gazing` state applies the intended 1.035 scale alongside the existing +4.29 px pupil and +3.11 px tinted-reflection movement. The slightly enlarged portrait remains balanced in the Hero without crowding the text or actions, and clears cleanly back to its resting size on pointer exit.

Final 390 px validation confirms the portrait remains at its normal compact size, with no hover scale or additional interactive layers active. The Hero copy, actions, reel, and contact dock remain clearly separated.

The eye-motion refinement retains the original source-crop pupils and single glasses pair at rest. The new treatment extends pupil response timing to 180 ms with a smoother ease-out curve, while the blink now closes from the upper eyelid edge through intermediate closure and reopening frames for a more organic motion path.

Live lower-left validation confirms both pupils receive the same -4.27 px / +2.24 px movement through the revised 180 ms `cubic-bezier(.18, .84, .28, 1)` curve. They retain their corrected shared baseline, individual source texture, original glasses placement, and coordinated head response.

The explicit closed-eye preview confirms both eyelids use matching top-edge origins, full-width warm eyelid coverage, and the same curved crease geometry inside the original round glasses. The added intermediate frames make the blink compress and release smoothly rather than appearing as an abrupt cover.

After the closed-eye inspection, the live preview was restored to the normal 9.2-second blink cadence and neutral gaze. Both pupil variables are clear and no temporary hover state remains.

The expression refinement introduces source-matched eyebrow windows positioned over the original brow artwork, so their resting state stays visually indistinguishable from the single base portrait. The pupil horizontal range is extended moderately from 4.35 px to 5.15 px while preserving the same vertical limit and synchronized baseline.

The far-right desktop test produced a wider +5.08 px pupil offset, with both eyebrow crops following at +1.33 px / -0.26 px through matching 220 ms ease-out transitions. The brows remain source-matched, aligned with the original artwork, and gain only a 1.2 px downward acknowledgement during the already-established blink-close frame. The mobile CSS continues to suppress both nonessential layers.

Final 390 px confirmation shows the compact Memoji remains static with its original eye and brow artwork, preserving clear spacing around the Hero controls, reel, and mobile contact dock.

The final polish shortens the visible blink sequence while retaining its calm 9.2-second cadence: a staged 0.37-second close-and-release replaces the earlier longer cover. Pupil tracking uses a 155 ms response and eyebrow tracking uses 185 ms, both with the same controlled ease-out curve to make the expression feel responsive without a detached layered effect.

Live leftward tracking reaches -5.08 px at the intended 155 ms pupil response, while both eyebrow layers retain their matching 185 ms motion curve. The direct visual check confirms the pupils remain synchronized and contained inside the original glasses, with the compact Hero composition preserved.

The final forced closed-eye inspection confirms two aligned eyelid layers, matching top-edge origins, and the restrained 0.85 px brow acknowledgement. The shorter staged blink retains a clear symmetrical closure inside the round frames and reopens without changing the original eye or glasses geometry.

The lifelike-motion refinement replaces the fixed repeating blink with a timer-scheduled desktop blink that varies naturally between 7.6 and 10.8 seconds. At rest, the strengthened backdrop remains a soft diffuse violet field behind the Memoji, without creating a visible rectangular visual stage.

The upper-right direct-hover test confirmed a +13.81 px / -8.83 px backdrop shift. The strengthened glow enlarges modestly and rises to the intended hover intensity after transition settling, while the rest of the Hero stays unobstructed and no persistent blink class was present outside its scheduled interval.

Final 390 px validation confirms the Memoji remains static: the timer-driven blink, pupil and brow response, and cursor-reactive glow are all absent, while the original compact portrait and mobile controls remain clear.

Expression refinement QA: synchronized source-crop pupils now travel up to 5.65 px horizontally and 2.55 px vertically with a fast 145 ms direct-hover response and softer 235 ms reset. The blink uses a 460 ms layered close, brief hold, and release path with matched lids and brow acknowledgement. Desktop resting and 390 px layouts remain clean, and the recent browser-console check returned no errors.

Integrated eye-edge QA: both existing eyelid layers contain their new upper contour and lower crease within the original circular eye bounds (`overflow: hidden`), with identical measured contour widths. The contours animate only through the scheduled desktop blink and do not create detached eyes or a second glasses frame. Desktop and 390 px mobile checks remain clean; no browser-console errors were recorded.

Interactive expression QA: desktop gaze now applies a restrained -0.48 px eyebrow lift only while the portrait is being directly hovered. On mobile, a stationary touch press triggers one 460 ms blink and releases cleanly; a 12 px movement threshold prevents scroll gestures from firing it. The mobile resting screenshot remains compact and unobstructed, while contour contrast was reduced for a more natural face blend. TypeScript and recent browser-console checks passed.

Sustained-hover QA: after 1.35 seconds of direct desktop hover, the portrait adds a gentle .42° / -.54° settling tilt and clears it immediately on leave. The eyebrow lift is now a more visible -.8 px. A stationary mobile tap still applies and clears the blink class cleanly, and the scoped mobile tap-glow animation rule is present; it remains protected by the existing motion-paused, low-data, and reduced-motion safeguards. Desktop and mobile resting views are clean, and no browser-console errors were found.

Tilt and shadow QA: the settled tilt now activates after 980 ms of direct desktop hover. Its new under-portrait shadow is a compact, low-opacity ellipse that receives both live pointer offsets and a small settled-tilt offset; the live check measured -3.30 px / -1.41 px pointer movement, .34 rem settled offset, and .20 peak opacity. Both settled tilt and shadow clear on leave. The 390 px fallback keeps the shadow hidden, and the recent console check returned no errors.

Soft-shadow QA: the ground shadow is now wider and more diffused (54% width, 9.5% height, 9 px blur) with reduced dark-gradient density. Its hover response remains active through direct pointer offsets while its visual opacity is lowered to .17 at peak; the mobile 390 px fallback remains clear without the shadow. TypeScript and recent console checks passed.

Pupil-tracking correction QA: both source-crop pupils now use a calibrated 4.25 px horizontal / 1.9 px vertical maximum with feathered crop edges, which better merges them with the original eye artwork. Live far-left and far-right checks measured identical shared transforms on both pupils (approximately -4.20 px and +4.04 px) and the return-to-centre check resolved to approximately .005 px after 280 ms. The desktop rest image retains one glasses frame; the mobile fallback keeps the tracking layers hidden. TypeScript and console checks passed.

Calm-gaze and reflection QA: pupil travel now tops out at 3.65 px horizontally and 1.6 px vertically, with a 160 ms live response and 205 ms eased reset. The direct hover check measured matching +3.58 px pupil transforms for both eyes. Existing reflection-only glasses glints brighten from .34/.28 at rest to .91/.77 on hover, with no new frame geometry. Desktop and 390 px mobile rest views remain clear, and the recent console check returned no errors.

Final eye-integration QA: pupil crops now use the identical brightness and contrast treatment as the base face image, retaining their feathered edges so the eyes remain visually attached to the face. A live direct-hover check confirmed matching pupil transforms (approximately -3.44 px), two reflection glints only, and one glasses layer. Hover reflections are slightly brighter than before while retaining reflection-only geometry; desktop and 390 px mobile views remain clean and recent console checks returned no errors.

Friendly-expression QA: click or tap applies a short 780 ms acknowledgment using the existing head and original brow source crops, with no synthetic mouth or extra face layer; the live desktop probe confirmed a -.46 px brow lift and clean release. The two glasses glints now use a 360 ms gentle exit transition. The greeting has been moved outside the portrait mask and was visibly confirmed above the Memoji on direct desktop hover; it remains hidden on mobile, where the compact Hero controls stay unobstructed. TypeScript and browser-console checks passed.

Left-right gaze correction QA: pupil travel is now strictly constrained to 2.65 px horizontally and 1.1 px vertically, preventing either source crop from reaching the eye edges. Live far-left and far-right checks measured matching transforms on both pupils (approximately -2.60 px and +2.52 px) and a near-zero synchronized reset. Desktop and 390 px mobile resting views remain clean; TypeScript passed.

Source-aligned iris repair QA: replaced the two moving circular source crops with full-size copies of the original portrait, each clipped to a small fixed iris aperture. The aperture boundaries remain fixed over their corresponding original eye, so only the iris source shifts on hover; this removes the visible sliding eye-crop seam. Live far-left/right checks confirmed identical -2.63 px / +2.63 px transforms and an exact synchronized zero reset. Desktop and 390 px mobile views are clean, TypeScript passed, and no recent browser-console errors were found.

Visible-gaze restoration QA: increased the shared pupil response to 3.25 px horizontally and 1.35 px vertically and expanded the fixed iris apertures slightly, restoring an immediately noticeable cursor-follow effect without crossing the original eye bounds. Live checks measured identical left/right transforms of about -3.15 px / +3.09 px and an upward response of -1.26 px; all pairs remained synchronized. Desktop and 390 px mobile resting views are clean, TypeScript passed, and no browser-console errors were found.

Direct pupil-targeting repair QA: relocated the fixed clip-and-mask aperture from each transformed pupil image to its static `.hero-memoji-pupil-window` container. The cursor handler already targeted the correct pair of images; this correction ensures the images visibly translate inside fixed eye sockets instead of carrying their clipping region with them. A held rightward frame visibly showed the pupil movement, and live inspection confirmed equal 3.19 px pupil transforms while brows and reflection retained separate values. The reset returns both pupils to zero; 390 px mobile remains uncluttered, TypeScript passed, and console review found no errors.

Direct-ref review QA: added explicit refs and `data-memoji-pupil="left"` / `"right"` markers to the two iris images. The handler now writes `translate3d(...)` directly to those exact nodes rather than relying on a shared CSS variable path. A live lower-right probe confirmed matching inline transforms of `translate3d(3.62px, 1.48px, 0px)` on both pupils while brow and reflection retained separate values; pointer leave clears both transforms. Desktop and 390 px mobile views remain clean, TypeScript passed, and console review found no errors.

Pupil visibility diagnosis: both pupil nodes are present, displayed, visible, and fully opaque above the base artwork (`z-index: 2` versus the base image at `z-index: 1`). The fixed parent apertures also resolve correctly. The remaining perceptual issue is that the duplicate source image shares the baked-in base iris artwork, so its small shifted area was too subtle against the static face; the next pass will improve the separation inside the masked eye whites while retaining the original socket geometry.

Visible-iris repair QA: added a soft, socket-matched eye-white backing to each fixed pupil aperture so the translated source iris reads clearly above the baked-in base image. Increased bounded direct pupil travel to 5.85 px horizontally and 2.35 px vertically while keeping it well inside the expanded 4.02% / 4.3% socket aperture. In a live far-right frame both pupils were visible, fully opaque, and synchronized at +5.80 px; reset returns both to exactly zero. The 390 px mobile fallback remains clean, TypeScript passed, and browser-console review found no errors.

Live DOM pupil-binding investigation (2026-08-28): the rendered portrait is wired to `onPointerMove={followHeroMemojiGaze}` and both `[data-memoji-pupil]` nodes are present. A CDP probe confirmed that the real inline styles update from `translate3d(-5.15px, 0.09px, 0px)` at left gaze to `translate3d(5.08px, 0.09px, 0px)` at right gaze; computed transforms match those values. Both nodes are visible, opaque, displayed, and not animated. The portrait CSS variables for brow and glint update in the same frames. Opposite-gaze screenshots show a measurable eye-region pixel difference and the tight side-by-side crop shows both irises shifting horizontally. No CSS `!important`, parent transform cancellation, or console errors were found. This is not a missing ref or inactive pointer handler; the live build is applying the pupil transform visually.

Hero Memoji refinement QA (2026-08-28): reduced the bounded pupil travel from 5.85/2.35 px to 3.35/1.45 px so the irises remain inside the white socket. The pupil transition now uses an interruptible 245 ms `cubic-bezier(.16, .9, .28, 1)` easing in the active gaze state. The existing 7.6–10.8 s natural blink cadence now randomizes each blink duration between 420–500 ms through `--hero-memoji-blink-duration`, shared by eyelids, eye-edge contours, and the desktop brow acknowledgement; mobile tap-blink retains its 460 ms fallback. Live timing verification observed computed pupil movement progressing from 0 to 2.42 px at 180 ms and 2.94 px at 280 ms before settling at 2.95 px for the sampled pointer position. A live blink was observed with a randomized 465 ms duration and cleanly removed afterward. TypeScript passed; desktop and 390 px mobile screenshots remain clean.
