# Project Collection Hover Glow — QA Notes

The live desktop preview reports a pointer-capable hover environment. The visible MyJob AI Radar card occupies approximately x=637–1023 and y=605–1129 in a 1280 × 1100 viewport, providing a direct target for hover verification. The halo is scoped to desktop hover/focus states and does not alter card text content.

The glow treatment is constrained to a narrow violet external halo plus an inner-edge highlight on hover or keyboard focus. Its base-state card title remains pure white for contrast, and reduced-motion handling reduces the treatment to a static outline/shadow state. The browser console does not retain pointer hover while it is open, so its reported base style is expected after the visual hover preview.
