/* Hero Memoji gaze controller.
 * The base portrait, eyes, eyebrows and glasses stay fixed.
 * Only the black pupil dots move inside the fixed eye windows.
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
  pupil.style.transform = "translate(-50%, -50%) translate3d(0px, 0px, 0px)";

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

  const render = () => {
    current.x += (target.x - current.x) * 0.24;
    current.y += (target.y - current.y) * 0.24;

    overlays.forEach(({ pupil }) => {
      pupil.style.transform = `translate(-50%, -50%) translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
    });

    if (Math.max(Math.abs(target.x - current.x), Math.abs(target.y - current.y)) > 0.02) {
      frame = window.requestAnimationFrame(render);
    } else {
      current.x = target.x;
      current.y = target.y;
      overlays.forEach(({ pupil }) => {
        pupil.style.transform = `translate(-50%, -50%) translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
      });
      frame = null;
    }
  };

  const queueRender = () => {
    if (frame === null) frame = window.requestAnimationFrame(render);
  };

  const updateFromMouse = (clientX: number, clientY: number) => {
    if (window.innerWidth < 768) return;

    // Map the full browser viewport to a predictable pupil range.
    // The face itself never moves; only the pupil dots receive these offsets.
    const viewportX = clamp((clientX / Math.max(window.innerWidth, 1) - 0.5) * 2, -1, 1);
    const viewportY = clamp((clientY / Math.max(window.innerHeight, 1) - 0.5) * 2, -1, 1);

    target.x = viewportX * 8.5;
    target.y = viewportY * 5.2;
    queueRender();
  };

  const onMouseMove = (event: MouseEvent) => updateFromMouse(event.clientX, event.clientY);
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    updateFromMouse(event.clientX, event.clientY);
  };
  const onMouseLeaveWindow = () => {
    // Keep the final gaze position rather than snapping the eyes back when the cursor
    // leaves the browser content area. A browser blur resets them to center instead.
  };
  const onWindowBlur = () => {
    target.x = 0;
    target.y = 0;
    queueRender();
  };

  document.addEventListener("mousemove", onMouseMove, { passive: true, capture: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("blur", onWindowBlur, { passive: true });
  void onMouseLeaveWindow;

  portrait.dataset.pupilOnlyInitialized = "true";

  // React may reconcile the original children back into these windows.
  const observer = new MutationObserver(() => {
    if (repairing) return;
    const stillValid = windows.every((entry) => entry.querySelector(".hero-memoji-iris"));
    if (stillValid) return;

    repairing = true;
    windows.forEach((entry, index) => {
      const replacement = buildOverlay(entry);
      overlays[index] = replacement;
      replacement.pupil.style.transform = `translate(-50%, -50%) translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
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
    if (attempts < 100) window.setTimeout(retry, 100);
  };
  retry();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
