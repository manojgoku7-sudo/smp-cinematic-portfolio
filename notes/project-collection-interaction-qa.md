# Project Collection Interaction Smoothing — QA Notes

The live centre card uses a 0.48-second physical ease for transform and shadow, a 0.72-second image drift, and a 0.42-second text-rail response. Fan layer lowering is delayed until the active card settles, preventing a visual snap while it returns to the stack. The resting geometry, labels, and button targets remain unchanged.

Keyboard-focus verification confirms that the selected centre card reaches foreground layer 50 after the easing window. Its card surface translates upward and outward, while the label rail follows with a smaller 3.2 px lift, producing the intended physical pull-out treatment.
