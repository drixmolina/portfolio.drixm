from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


def save_modern_formats(image: Image.Image, destination: Path, stem: str) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    rgb = image.convert("RGB")
    rgb.save(destination / f"{stem}.webp", "WEBP", quality=82, method=6)
    rgb.save(destination / f"{stem}.avif", "AVIF", quality=62, speed=6)


def optimize_portrait() -> None:
    source = Image.open(PUBLIC / "profile" / "drix-portrait-new.png").convert("RGB")
    for width in (640, 960):
        height = round(source.height * width / source.width)
        resized = source.resize((width, height), Image.Resampling.LANCZOS)
        save_modern_formats(resized, PUBLIC / "profile", f"drix-portrait-{width}")


def optimize_facilitease_thumbnail() -> None:
    source = Image.open(PUBLIC / "projects" / "facilitease-thumbnail.png").convert("RGB")
    for width in (960, 1600):
        height = round(source.height * width / source.width)
        resized = source.resize((width, height), Image.Resampling.LANCZOS)
        save_modern_formats(
            resized,
            PUBLIC / "projects",
            f"facilitease-thumbnail-{width}",
        )


def blur_region(image: Image.Image, box: tuple[int, int, int, int]) -> None:
    safe_box = (
        max(0, box[0]),
        max(0, box[1]),
        min(image.width, box[2]),
        min(image.height, box[3]),
    )
    region = image.crop(safe_box).filter(ImageFilter.GaussianBlur(radius=10))
    image.paste(region, safe_box)


def sanitize_company_screenshots() -> None:
    source_dir = PUBLIC / "projects" / "highly-succeed"
    output_dir = source_dir / "safe"
    regions = {
        "admin-panel.jpeg": [(118, 150, 1235, 470)],
        "attendance-timekeeping.jpeg": [(118, 215, 1235, 535)],
        "employee-cards.jpeg": [(118, 120, 1235, 535)],
        "employee-management.jpeg": [(118, 120, 1235, 535)],
        "leave-management.jpeg": [(118, 220, 1235, 535)],
        "login.jpeg": [(640, 150, 1235, 535)],
    }

    for filename, boxes in regions.items():
        image = Image.open(source_dir / filename).convert("RGB")
        blur_region(image, (0, 490, 125, image.height))
        blur_region(image, (1015, 0, image.width, 80))
        for box in boxes:
            blur_region(image, box)
        save_modern_formats(image, output_dir, Path(filename).stem)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    font_name = "segoeuib.ttf" if bold else "segoeui.ttf"
    font_path = Path("C:/Windows/Fonts") / font_name
    return ImageFont.truetype(str(font_path), size=size)


def create_social_image() -> None:
    width, height = 1200, 630
    canvas = Image.new("RGB", (width, height), "#070707")
    portrait = Image.open(PUBLIC / "profile" / "drix-portrait-new.png").convert("RGB")
    portrait = ImageOps.fit(
        portrait,
        (420, height),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.57),
    )
    portrait = ImageEnhance.Color(portrait).enhance(0.65)
    portrait = ImageEnhance.Brightness(portrait).enhance(0.72)
    canvas.paste(portrait, (780, 0))

    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    for x in range(630, 1010):
        alpha = int(255 * (1 - (x - 630) / 380))
        overlay_draw.line((x, 0, x, height), fill=(7, 7, 7, max(0, alpha)))
    canvas = Image.alpha_composite(canvas.convert("RGBA"), overlay)

    draw = ImageDraw.Draw(canvas)
    off_white = "#f5f2ed"
    muted = "#aaa7a2"
    red = "#d72323"

    draw.text((72, 64), "DRIX MOLINA / PORTFOLIO", font=font(22, True), fill=red)
    draw.line((72, 110, 720, 110), fill="#353535", width=2)
    draw.line((72, 110, 210, 110), fill=red, width=3)
    draw.text((72, 158), "FULL-STACK", font=font(72, True), fill=off_white)
    draw.text((72, 238), "DEVELOPER", font=font(72, True), fill=off_white)
    draw.text(
        (76, 350),
        "React interfaces. PHP/MySQL workflows.",
        font=font(27),
        fill=muted,
    )
    draw.text(
        (76, 393),
        "Practical systems built with care.",
        font=font(27),
        fill=muted,
    )
    draw.text(
        (76, 521),
        "PHILIPPINES  /  OPEN TO REMOTE",
        font=font(18, True),
        fill=off_white,
    )
    draw.line((72, 566, 1118, 566), fill="#353535", width=1)
    draw.rectangle((1112, 44, 1118, 142), fill=red)
    canvas.convert("RGB").save(
        PUBLIC / "og-image.png",
        "PNG",
        optimize=True,
    )


def main() -> None:
    optimize_portrait()
    optimize_facilitease_thumbnail()
    sanitize_company_screenshots()
    create_social_image()


if __name__ == "__main__":
    main()
