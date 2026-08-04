from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "projects" / "facilitease-paper.pdf"
TEMP_OUTPUT = SOURCE.with_name("facilitease-paper.optimized.pdf")


def flatten_transparency(image: Image.Image) -> Image.Image:
    if image.mode != "RGBA":
        return image.convert("RGB")

    background = Image.new("RGB", image.size, "white")
    background.paste(image, mask=image.getchannel("A"))
    return background


def compress_research_pdf() -> None:
    reader = PdfReader(str(SOURCE))
    writer = PdfWriter(clone_from=reader)

    replaced = 0
    for page in writer.pages:
        for image_file in list(page.images):
            image = flatten_transparency(image_file.image)
            image.thumbnail((1400, 1600), Image.Resampling.LANCZOS)
            image_file.replace(image, quality=62)
            replaced += 1

    writer.add_metadata(
        {
            "/Title": "FacilitEASE Research Paper",
            "/Author": "Drix Molina and the FacilitEASE team",
        }
    )
    with TEMP_OUTPUT.open("wb") as output:
        writer.write(output)

    check = PdfReader(str(TEMP_OUTPUT))
    if len(check.pages) != len(reader.pages):
        raise RuntimeError("Optimized PDF page count does not match the source.")

    TEMP_OUTPUT.replace(SOURCE)
    print(f"Optimized {replaced} embedded images across {len(reader.pages)} pages.")


if __name__ == "__main__":
    compress_research_pdf()
