/* Hero Memoji gaze controller.
 * The base portrait, eyes, eyebrows and glasses stay fixed.
 * Only the pupil dots move, and they track the mouse across the entire viewport.
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
    current.x += (target.x - current.x) * 0.22;
    current.y += (target.y - current.y) * 0.22;

    const x = `${current.x.toFixed(2)}px`;
    const y = `${current.y.toFixed(2)}px`;
    overlays.forEach(({ pupil }) => {
      pupil.style.setProperty("--hero-pupil-x", x);
      pupil.style.setProperty("--hero-pupil-y", y);
    });

    const settling = Math.max(
      Math.abs(target.x - current.x),
      Math.abs(target.y - current.y),
    ) > 0.02;
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

  const updateFromMouse = (clientX: number, clientY: number) => {
    if (window.innerWidth < 768) return;

    const first = windows[0].getBoundingClientRect();
    const second = windows[1].getBoundingClientRect();
    const centerX = ((first.left + first.width / 2) + (second.left + second.width / 2)) / 2;
    const centerY = ((first.top + first.height / 2) + (second.top + second.height / 2)) / 2;
    const eyeWidth = Math.max((first.width + second.width) / 2, 1);
    const eyeHeight = Math.max((first.height + second.height) / 2, 1);

    // Normalize against the actual eye position. This makes the gaze respond
    // strongly to the mouse even when it is far away from the portrait.
    const horizontal = clamp((clientX - centerX) / (eyeWidth * 2.0), -1, 1);
    const vertical = clamp((clientY - centerY) / (eyeHeight * 1.5), -1, 1);

    target.x = horizontal * eyeWidth * 0.42;
    target.y = vertical * eyeHeight * 0.31;
    queueTick();
  };

  // Use mousemove on the document rather than relying only on PointerEvent.
  // This is intentionally global so the pupils continue tracking anywhere on the page.
  const onMouseMove = (event: MouseEvent) => {
    updateFromMouse(event.clientX, event.clientY);
  };

  const onResize = () => {
    updateFromMouse(window.innerWidth / 2, window.innerHeight / 2);
  };

  document.addEventListener("mousemove", onMouseMove, { passive: true, capture: true });
  window.addEventListener("resize", onResize, { passive: true });
  onResize();

  portrait.dataset.pupilOnlyInitialized = "true";

  // React may reconcile the original children back into these windows.
  // Repair only the two overlay windows; never touch the base portrait.
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
    if (attempts < 60) window.setTimeout(retry, 100);
  };
  retry();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
