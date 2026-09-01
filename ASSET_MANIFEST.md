# Portfolio Asset Manifest

All generated website media is stored as actual binary files in the repository and referenced through root-relative public paths. This makes the assets available after cloning the GitHub repository.

| Asset | Type | Size | Repository path |
|---|---|---:|---|
| `ai-content-studio-showcase_e194be53.jpg` | JPEG | 220,936 bytes | `client/public/images/ai-content-studio-showcase_e194be53.jpg` |
| `manoj-hero-transparent-memoji-glasses-a_0af8bf1f.png` | PNG | 750,628 bytes | `client/public/images/manoj-hero-transparent-memoji-glasses-a_0af8bf1f.png` |
| `polur-charm-portfolio-art_ee154405.jpg` | JPEG | 244,178 bytes | `client/public/images/polur-charm-portfolio-art_ee154405.jpg` |
| `project-collection-aroma-diffuser_04698510.jpg` | JPEG | 183,658 bytes | `client/public/images/project-collection-aroma-diffuser_04698510.jpg` |
| `project-collection-myjob-radar_8cc39039.jpg` | JPEG | 221,088 bytes | `client/public/images/project-collection-myjob-radar_8cc39039.jpg` |
| `project-collection-pinterest-automation_0e75a634.jpg` | JPEG | 362,366 bytes | `client/public/images/project-collection-pinterest-automation_0e75a634.jpg` |
| `project-collection-social-publishing_227bb808.jpg` | JPEG | 388,548 bytes | `client/public/images/project-collection-social-publishing_227bb808.jpg` |
| `smp-ambient-texture_4dec6a68.jpg` | JPEG | 252,458 bytes | `client/public/images/smp-ambient-texture_4dec6a68.jpg` |
| `smp-anime-black-hole_fe55ef2a.mp4` | MP4 | 2,033,613 bytes | `client/public/videos/smp-anime-black-hole_fe55ef2a.mp4` |
| `smp-hero-orbit_86f3fd46.jpg` | JPEG | 101,644 bytes | `client/public/images/smp-hero-orbit_86f3fd46.jpg` |
| `smp-mj-monogram-clear-j_24fbf37a.png` | PNG | 325,722 bytes | `client/public/images/smp-mj-monogram-clear-j_24fbf37a.png` |
| `smp-project-food_c1b44933.jpg` | JPEG | 99,318 bytes | `client/public/images/smp-project-food_c1b44933.jpg` |
| `smp-project-security_4a7c2847.jpg` | JPEG | 202,166 bytes | `client/public/images/smp-project-security_4a7c2847.jpg` |

## Audit result

- **Total generated assets found:** 13.
- **Actual binaries stored in the repository:** 13.
- **Still externally hosted as the application source of truth:** 0.
- **Images:** 12, all under `client/public/images/`.
- **Video:** 1, under `client/public/videos/`.
- **Largest file:** `smp-anime-black-hole_fe55ef2a.mp4` at 2,033,613 bytes (approximately 1.94 MiB), below GitHub's 100 MB regular-file limit.
- **Secrets added:** none. `.env` files, credentials, API keys, tokens, and private keys remain excluded.
- **Reference format:** React and HTML use `/images/...` and `/videos/...`; no `manus-storage`, `localhost`, `blob:`, or sandbox-only asset references remain in application source.

The 13 binaries are intentionally kept in `client/public/` because this is the existing Vite public root; Vite copies them to the deployment root while preserving the `/images/` and `/videos/` URL paths.

Author: Manus AI
