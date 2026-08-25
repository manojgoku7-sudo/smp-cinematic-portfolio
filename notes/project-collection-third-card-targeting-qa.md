# Project Collection Third Card Targeting — QA Notes

The third card’s visible centre was being intercepted by the fourth card’s absolute wrapper rather than its actual transformed card face. The third card itself is stacked at level 3, but the fourth wrapper at level 4 occupies transparent space over it, preventing pointer activation. The correction will make wrappers transparent to pointer events while retaining pointer events on the actual card buttons, so only visible card faces capture interaction.

Initial live verification still reports the fourth wrapper at the third card centre, so the wrapper-targeting rule is being superseded and requires a more specific corrective selector before delivery. The third card focus path remains available and reports the slowed 1.95-second pulse.

The enforced pointer rule now resolves the third card’s visible centre directly to `collection-card-3`, while its wrapper is pointer-transparent and the card button remains pointer-active. A direct click opened the existing MyJob AI Radar details dialog and retained its approved Live Demo action.
