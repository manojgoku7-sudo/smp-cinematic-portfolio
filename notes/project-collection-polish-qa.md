# Project Collection Fan Polish — QA Notes

Desktop inspection confirmed that the Project Collection remains a single overlapping four-card physical fan. The adjusted card offsets keep the same shared lower fan origin while exposing more of each card face. Each title/category rail now uses its own opaque lower panel and is constrained to the exposed leading edge of the card. Outer cards use reduced scale, brightness, and shadow elevation; the two centre cards retain the stronger depth focus. Existing project-detail triggers remain present for all four cards.

The centered viewport inspection also confirmed that the fan remains compact rather than reverting to a row or grid, with the outer cards visually recessed and each card trigger available to keyboard and pointer users.

DOM hit-testing confirmed that the first three title rails resolve to their own visible card face after the copy-rail adjustment. The fourth rail remains intentionally positioned on its outer face and receives an additional outward clearance offset in the final pass.

Final DOM hit-testing confirms that all four title rails resolve to their corresponding card faces. A centre-card hover preview preserves the fan while drawing the active card forward; the fourth text rail now sits on the clear outer upper face.

The active desktop preview measures 1280 × 1100. The card layer has the configured transform transition and the focused fan wrapper resolves to stack level 50, preserving the intended foreground behavior.

The measured fan transforms retain the intentionally reduced outer-card scale and the emphasized centre-card scale. The active card wrapper resolves above the remaining stack, so focus and hover can pull a selected card forward without changing the fan’s resting geometry.
