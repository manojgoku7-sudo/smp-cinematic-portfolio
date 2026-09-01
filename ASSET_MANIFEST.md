# Portfolio Asset Manifest

This portfolio references generated media through stable WebDev storage paths. The original binaries are preserved in the WebDev static-asset staging area and are not placed in the application bundle, because copying media into a static WebDev project can increase deployment size and cause deployment timeouts.

| Asset | Type | Size | Stable reference |
|---|---:|---:|---|
| `ai-content-studio-showcase_e194be53.jpg` | JPEG | 220,936 bytes | `/manus-storage/ai-content-studio-showcase_e194be53_f5617848.jpg` |
| `manoj-hero-transparent-memoji-glasses-a_0af8bf1f.png` | PNG | 750,628 bytes | `/manus-storage/manoj-hero-transparent-memoji-glasses-a_0af8bf1f_8da5e597.png` |
| `polur-charm-portfolio-art_ee154405.jpg` | JPEG | 244,178 bytes | `/manus-storage/polur-charm-portfolio-art_ee154405_ec058461.jpg` |
| `project-collection-aroma-diffuser_04698510.jpg` | JPEG | 183,658 bytes | `/manus-storage/project-collection-aroma-diffuser_04698510_aefedb70.jpg` |
| `project-collection-myjob-radar_8cc39039.jpg` | JPEG | 221,088 bytes | `/manus-storage/project-collection-myjob-radar_8cc39039_5f1ef531.jpg` |
| `project-collection-pinterest-automation_0e75a634.jpg` | JPEG | 362,366 bytes | `/manus-storage/project-collection-pinterest-automation_0e75a634_95dab155.jpg` |
| `project-collection-social-publishing_227bb808.jpg` | JPEG | 388,548 bytes | `/manus-storage/project-collection-social-publishing_227bb808_cfb7271f.jpg` |
| `smp-ambient-texture_4dec6a68.jpg` | JPEG | 252,458 bytes | `/manus-storage/smp-ambient-texture_4dec6a68_28fa5087.jpg` |
| `smp-anime-black-hole_fe55ef2a.mp4` | MP4 | 2,033,613 bytes | `/manus-storage/smp-anime-black-hole_fe55ef2a_5dc475f2.mp4` |
| `smp-hero-orbit_86f3fd46.jpg` | JPEG | 101,644 bytes | `/manus-storage/smp-hero-orbit_86f3fd46_5b987b45.jpg` |
| `smp-mj-monogram-clear-j_24fbf37a.png` | PNG | 325,722 bytes | `/manus-storage/smp-mj-monogram-clear-j_24fbf37a_a9798af9.png` |
| `smp-project-food_c1b44933.jpg` | JPEG | 99,318 bytes | `/manus-storage/smp-project-food_c1b44933_8dbf89a0.jpg` |
| `smp-project-security_4a7c2847.jpg` | JPEG | 202,166 bytes | `/manus-storage/smp-project-security_4a7c2847_3174a24e.jpg` |

All 13 referenced assets resolved successfully from the development server before upload. No `.env`, credentials, API keys, or private keys were added. The repository contains this manifest so a clone documents the required media dependencies; the application itself uses stable `/manus-storage/` references rather than localhost, blob URLs, or sandbox-only file paths.

## GitHub note

The current Git remote is the existing `origin` remote on branch `main`. A GitHub push still requires the authenticated remote workflow; no force-push or repository replacement is permitted.

## Verification checklist

- [x] All generated image and video references inventoried.
- [x] All 13 referenced assets downloaded and re-uploaded successfully.
- [x] All source references updated to the newly uploaded stable paths.
- [x] Required binary media is not ignored by `.gitignore`; only the external WebDev staging copy is intentionally outside the repository.
- [x] No secret files were staged.
- [ ] Commit and push the manifest and reference updates to the existing GitHub repository.
- [ ] Verify the pushed commit on GitHub.

Last audited: 2026-09-01.

Author: Manus AI
