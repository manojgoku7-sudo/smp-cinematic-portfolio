/* Hero Memoji eye fix: keep the source portrait, glasses, eyebrows, and eyeballs fixed.
 * Only the black pupils move inside a fixed iris/sclera overlay.
 */

type EyeOverlay = {
  window: HTMLSpanElement;
  iris: HTMLSpanElement;
  pupil: HTMLSpanElement;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

function createEyeOverlay(sourceWindow: HTMLSpanElement): EyeOverlay {
  sourceWindow.innerHTML = "";
  sourceWindow.classList.add("hero-memoji-pupil-only-window");

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
  if (!portrait) return false;

  const windows = Array.from(
    portrait.querySelectorAll<HTMLSpanElement>(".hero-memoji-pupil-window"),
  ).slice(0, 2);
  if (windows.length !== 2) return false;

  const overlays = windows.map(createEyeOverlay);
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  let frame: number | null = null;

  const tick = () => {
    current.x += (target.x - current.x) * 0.16;
    current.y += (target.y - current.y) * 0.16;
    const x = `${current.x.toFixed(2)}px`;
    const y = `${current.y.toFixed(2)}px`;
    overlays.forEach(({ pupil }) => {
      pupil.style.transform = `translate3d(${x}, ${y}, 0)`;
    });
    const settling = Math.max(Math.abs(target.x - current.x), Math.abs(target.y - current.y)) > 0.02;
    if (settling) frame = window.requestAnimationFrame(tick);
    else frame = null;
  };

  portrait.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || window.innerWidth < 768) return;
    const bounds = portrait.getBoundingClientRect();
    const px = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
    const py = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
    target.x = clamp(px * 4.8, -4.8, 4.8);
    target.y = clamp(py * 2.2, -2.2, 2.2);
    if (frame === null) frame = window.requestAnimationFrame(tick);
  }, { passive: true });

  portrait.addEventListener("pointerleave", () => {
    target.x = 0;
    target.y = 0;
    if (frame === null) frame = window.requestAnimationFrame(tick);
  });

  return true;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    // React may mount just after DOMContentLoaded, so retry briefly.
    let attempts = 0;
    const retry = () => {
      if (initHeroMemojiPupilOnly()) return;
      attempts += 1;
      if (attempts < 30) window.setTimeout(retry, 100);
    };
    retry();
  }, { once: true });
} else {
  let attempts = 0;
  const retry = () => {
    if (initHeroMemojiPupilOnly()) return;
    attempts += 1;
    if (attempts < 30) window.setTimeout(retry, 100);
  };
  retry();
}
