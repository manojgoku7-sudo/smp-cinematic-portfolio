# Portfolio Asset Manifest

All website media is stored as actual binary files in the repository and referenced through root-relative public paths. This makes the assets available after cloning the GitHub repository.

> Phase 1 fix (2026-09-07): all images were WebP-encoded bytes mislabeled as `.jpg`/`.png`.
> They have been renamed to truthful `.webp` extensions and every code reference updated.
> The hero Memoji was additionally given true transparency (flood-filled background),
> resized 1920px → 1200px wide, and re-encoded (750,628 → 237,570 bytes).
> Favicons are real PNGs generated from the monogram at correct sizes.

| Asset | Type | Size | Repository path |
|---|---|---:|---|
| `ai-content-studio-showcase_e194be53.webp` | WebP | 220,936 bytes | `client/public/images/ai-content-studio-showcase_e194be53.webp` |
| `manoj-hero-transparent-memoji-glasses-a_0af8bf1f.webp` | WebP (transparent) | 237,570 bytes | `client/public/images/manoj-hero-transparent-memoji-glasses-a_0af8bf1f.webp` |
| `polur-charm-portfolio-art_ee154405.webp` | WebP | 244,178 bytes | `client/public/images/polur-charm-portfolio-art_ee154405.webp` |
| `project-collection-aroma-diffuser_04698510.webp` | WebP | 183,658 bytes | `client/public/images/project-collection-aroma-diffuser_04698510.webp` |
| `project-collection-myjob-radar_8cc39039.webp` | WebP | 221,088 bytes | `client/public/images/project-collection-myjob-radar_8cc39039.webp` |
| `project-collection-pinterest-automation_0e75a634.webp` | WebP | 362,366 bytes | `client/public/images/project-collection-pinterest-automation_0e75a634.webp` |
| `project-collection-social-publishing_227bb808.webp` | WebP | 388,548 bytes | `client/public/images/project-collection-social-publishing_227bb808.webp` |
| `smp-ambient-texture_4dec6a68.webp` | WebP | 252,458 bytes | `client/public/images/smp-ambient-texture_4dec6a68.webp` |
| `smp-anime-black-hole_fe55ef2a.mp4` | MP4 | 2,033,613 bytes | `client/public/videos/smp-anime-black-hole_fe55ef2a.mp4` |
| `smp-apple-touch-icon.png` | PNG 180×180 | 35,476 bytes | `client/public/images/smp-apple-touch-icon.png` |
| `smp-favicon-64.png` | PNG 64×64 | 7,301 bytes | `client/public/images/smp-favicon-64.png` |
| `smp-hero-orbit_86f3fd46.webp` | WebP | 101,644 bytes | `client/public/images/smp-hero-orbit_86f3fd46.webp` |
| `smp-mj-monogram-clear-j_24fbf37a.webp` | WebP | 325,722 bytes | `client/public/images/smp-mj-monogram-clear-j_24fbf37a.webp` |
| `smp-project-food_c1b44933.webp` | WebP | 99,318 bytes | `client/public/images/smp-project-food_c1b44933.webp` |
| `smp-project-security_4a7c2847.webp` | WebP | 202,166 bytes | `client/public/images/smp-project-security_4a7c2847.webp` |
| `smp-social-card.jpg` | JPEG 1200×630 | 60,394 bytes | `client/public/images/smp-social-card.jpg` |
| `smp-icon-192.png` | PNG 192×192 | 38,802 bytes | `client/public/images/smp-icon-192.png` |
| `smp-icon-512.png` | PNG 512×512 | 61,465 bytes | `client/public/images/smp-icon-512.png` |
| `smp-icon-maskable-512.png` | PNG 512×512 | 38,330 bytes | `client/public/images/smp-icon-maskable-512.png` |

## Audit result

- **Total assets:** 19 (12 WebP images, 1 JPEG social card, 5 PNG icons, 1 MP4 video).
- **Images:** all under `client/public/images/`.
- **Video:** 1, under `client/public/videos/`.
- **Largest file:** `smp-anime-black-hole_fe55ef2a.mp4` at 2,033,613 bytes (approximately 1.94 MiB), below GitHub's 100 MB regular-file limit.
- **Secrets added:** none. `.env` files, credentials, API keys, tokens, and private keys remain excluded.
- **Reference format:** React and HTML use `/images/...` and `/videos/...`; no `manus-storage`, `localhost`, `blob:`, or sandbox-only asset references remain in application source.
- **Framing preserved:** the Memoji resize kept identical aspect ratio and framing, so percentage-based pupil-overlay alignment is unaffected.

The binaries are intentionally kept in `client/public/` because this is the existing Vite public root; Vite copies them to the deployment root while preserving the `/images/` and `/videos/` URL paths.

Author: Manus AI
