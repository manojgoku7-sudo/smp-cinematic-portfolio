/* Hero Memoji gaze controller.
 * The portrait, eye whites, eyebrows and glasses stay fixed.
 * Only the black pupil dots move inside each eye.
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
  pupil.style.transform = "translate(-50%, -50%)";
  pupil.style.left = "50%";
  pupil.style.top = "50%";

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
  const target = overlays.map(() => ({ x: 0, y: 0 }));
  const current = overlays.map(() => ({ x: 0, y: 0 }));
  let frame: number | null = null;
  let repairing = false;

  const render = () => {
    let settling = false;

    overlays.forEach(({ pupil }, index) => {
      current[index].x += (target[index].x - current[index].x) * 0.28;
      current[index].y += (target[index].y - current[index].y) * 0.28;

      pupil.style.left = `calc(50% + ${current[index].x.toFixed(2)}px)`;
      pupil.style.top = `calc(50% + ${current[index].y.toFixed(2)}px)`;

      if (
        Math.max(
          Math.abs(target[index].x - current[index].x),
          Math.abs(target[index].y - current[index].y),
        ) > 0.03
      ) {
        settling = true;
      }
    });

    if (settling) {
      frame = window.requestAnimationFrame(render);
    } else {
      overlays.forEach(({ pupil }, index) => {
        current[index].x = target[index].x;
        current[index].y = target[index].y;
        pupil.style.left = `calc(50% + ${current[index].x.toFixed(2)}px)`;
        pupil.style.top = `calc(50% + ${current[index].y.toFixed(2)}px)`;
      });
      frame = null;
    }
  };

  const queueRender = () => {
    if (frame === null) frame = window.requestAnimationFrame(render);
  };

  const updateFromMouse = (clientX: number, clientY: number) => {
    if (window.innerWidth < 768) return;

    overlays.forEach(({ window: eyeWindow }, index) => {
      const rect = eyeWindow.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const nx = clamp((clientX - centerX) / (rect.width * 0.72), -1, 1);
      const ny = clamp((clientY - centerY) / (rect.height * 0.72), -1, 1);

      // Keep the pupil comfortably inside the iris while making movement obvious.
      target[index].x = nx * rect.width * 0.22;
      target[index].y = ny * rect.height * 0.18;
    });

    queueRender();
  };

  const onMouseMove = (event: MouseEvent) => updateFromMouse(event.clientX, event.clientY);
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType && event.pointerType !== "mouse") return;
    updateFromMouse(event.clientX, event.clientY);
  };
  const onWindowBlur = () => {
    target.forEach((point) => {
      point.x = 0;
      point.y = 0;
    });
    queueRender();
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("blur", onWindowBlur, { passive: true });

  portrait.dataset.pupilOnlyInitialized = "true";

  // React can reconcile the original children back into these windows. Rebuild only
  // the pupil overlays and preserve the current tracked position.
  const observer = new MutationObserver(() => {
    if (repairing) return;
    const stillValid = windows.every((entry) => entry.querySelector(".hero-memoji-iris"));
    if (stillValid) return;

    repairing = true;
    windows.forEach((entry, index) => {
      const replacement = buildOverlay(entry);
      overlays[index] = replacement;
      replacement.pupil.style.left = `calc(50% + ${current[index].x.toFixed(2)}px)`;
      replacement.pupil.style.top = `calc(50% + ${current[index].y.toFixed(2)}px)`;
    });
    repairing = false;
  });
  observer.observe(portrait, { subtree: true, childList: true });

  // Capture the current pointer position immediately after initialization.
  updateFromMouse(window.innerWidth / 2, window.innerHeight / 2);
  return true;
}

const waitForPortrait = () => {
  if (initHeroMemojiPupilOnly()) return;

  const observer = new MutationObserver(() => {
    if (initHeroMemojiPupilOnly()) observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  window.setTimeout(() => observer.disconnect(), 15000);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", waitForPortrait, { once: true });
} else {
  waitForPortrait();
}
