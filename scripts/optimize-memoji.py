from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/webdev-static-assets/smp-cinematic-portfolio/manoj-hero-transparent-memoji-glasses-clean-strands.webp.png')
target = Path('/home/ubuntu/smp-cinematic-portfolio/client/public/images/manoj-hero-transparent-memoji-glasses-clean-strands.webp')
image = Image.open(source).convert('RGB')
image.save(target, 'WEBP', quality=86, method=6)
print(f'{target} {target.stat().st_size} bytes')
