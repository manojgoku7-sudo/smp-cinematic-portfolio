/* Hero Memoji gaze controller.
 * The base portrait, eyes, eyebrows and glasses stay fixed.
 * Only the pupil dots move, and they track the mouse across the entire page.
 */

type EyeOverlay = {
  window: HTMLSpanElement;
  iris: HTMLSpanElement;
  pupil: HTMLSpanElement;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function buildOverlay(sourceWindow: HTMLSpanElement): EyeOverlay {
  sourceWindow.classList.add("hero-memoji-pupil-only-window");
  sourceWindow.replaceChildren();

  const iris = document.createElement("span");
  iris.className = "hero-memoji-iris";

  const pupil = document.createElement("span");
  pupil.className = "hero-memoji-pupil-dot";

  iris.appendChild(pupil);
  sourceWindow.appendChild(iris);
  return { window: sourceWindow, iris, pupil };
}

function initHeroMemojiPupilOnly() {
  const portrait = document.querySelector<HTMLElement>(".hero-memoji-portrait");
  if (!portrait || portrait.dataset.pupilOnlyInitialized === "true") return false;

  const windows = Array.from(
    portrait.querySelectorAll<HTMLSpanElement>(".hero-memoji-pupil-window"),
  ).slice(0, 2);
  if (windows.length !== 2) return false;

  const overlays: EyeOverlay[] = windows.map(buildOverlay);
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  let frame: number | null = null;
  let repairing = false;

  const tick = () => {
    current.x += (target.x - current.x) * 0.2;
    current.y += (target.y - current.y) * 0.2;

    const x = `${current.x.toFixed(2)}px`;
    const y = `${current.y.toFixed(2)}px`;
    overlays.forEach(({ pupil }) => {
      pupil.style.setProperty("--hero-pupil-x", x);
      pupil.style.setProperty("--hero-pupil-y", y);
    });

    const settling = Math.max(
      Math.abs(target.x - current.x),
      Math.abs(target.y - current.y),
    ) > 0.03;
    if (settling) {
      frame = window.requestAnimationFrame(tick);
    } else {
      current.x = target.x;
      current.y = target.y;
      const finalX = `${current.x.toFixed(2)}px`;
      const finalY = `${current.y.toFixed(2)}px`;
      overlays.forEach(({ pupil }) => {
        pupil.style.setProperty("--hero-pupil-x", finalX);
        pupil.style.setProperty("--hero-pupil-y", finalY);
      });
      frame = null;
    }
  };

  const queueTick = () => {
    if (frame === null) frame = window.requestAnimationFrame(tick);
  };

  const updateFromPointer = (clientX: number, clientY: number) => {
    if (window.innerWidth < 768) return;

    const firstWindow = windows[0].getBoundingClientRect();
    const secondWindow = windows[1].getBoundingClientRect();
    const centerX = (
      firstWindow.left + firstWindow.width / 2 +
      secondWindow.left + secondWindow.width / 2
    ) / 2;
    const centerY = (
      firstWindow.top + firstWindow.height / 2 +
      secondWindow.top + secondWindow.height / 2
    ) / 2;
    const eyeWidth = Math.max((firstWindow.width + secondWindow.width) / 2, 1);
    const eyeHeight = Math.max((firstWindow.height + secondWindow.height) / 2, 1);

    // The cursor can be anywhere on the viewport. The response saturates smoothly
    // so distant cursor positions still produce a strong but eye-safe gaze.
    const horizontal = clamp((clientX - centerX) / (eyeWidth * 2.25), -1, 1);
    const vertical = clamp((clientY - centerY) / (eyeHeight * 1.75), -1, 1);

    target.x = horizontal * eyeWidth * 0.36;
    target.y = vertical * eyeHeight * 0.27;
    queueTick();
  };

  // Global listener: tracking works even when the mouse is far outside the portrait.
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    updateFromPointer(event.clientX, event.clientY);
  };

  const onResize = () => updateFromPointer(window.innerWidth / 2, window.innerHeight / 2);

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  onResize();

  portrait.dataset.pupilOnlyInitialized = "true";

  // React can reconcile its original children back into these windows.
  // Repair only the overlay contents; never touch the base portrait itself.
  const observer = new MutationObserver(() => {
    if (repairing) return;
    const stillValid = windows.every((entry) => entry.querySelector(".hero-memoji-iris"));
    if (stillValid) return;

    repairing = true;
    windows.forEach((entry, index) => {
      const replacement = buildOverlay(entry);
      overlays[index] = replacement;
      replacement.pupil.style.setProperty("--hero-pupil-x", `${current.x.toFixed(2)}px`);
      replacement.pupil.style.setProperty("--hero-pupil-y", `${current.y.toFixed(2)}px`);
    });
    repairing = false;
  });
  observer.observe(portrait, { subtree: true, childList: true });

  return true;
}

const boot = () => {
  let attempts = 0;
  const retry = () => {
    if (initHeroMemojiPupilOnly()) return;
    attempts += 1;
    if (attempts < 50) window.setTimeout(retry, 100);
  };
  retry();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
