from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "source-assets" / "deadkids" / "full-page.png"
OUTPUT = ROOT / "public" / "projects" / "deadkids"

SECTIONS = {
    "hero": (0, 0, 1240, 560),
    "selected-pieces": (0, 560, 1240, 1925),
    "shop": (0, 1925, 1240, 2440),
    "around-the-world": (0, 2440, 1240, 3830),
    "worn-beyond-borders": (0, 3830, 1240, 5150),
    "brand-manifesto": (0, 5150, 1240, 5610),
    "next-release": (0, 5610, 1240, 6090),
    "reviews": (0, 6090, 1240, 7280),
    "contact": (0, 7280, 1240, 8270),
}


def save_modern_formats(image: Image.Image, stem: str) -> None:
    rgb = image.convert("RGB")
    rgb.save(OUTPUT / f"{stem}.webp", "WEBP", quality=84, method=6)
    rgb.save(OUTPUT / f"{stem}.avif", "AVIF", quality=64, speed=6)


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE).convert("RGB")

    for stem, bounds in SECTIONS.items():
        save_modern_formats(source.crop(bounds), stem)


if __name__ == "__main__":
    main()
