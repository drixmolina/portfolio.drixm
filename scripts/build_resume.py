from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume" / "Drix_Molina_Resume.pdf"
PAGE_WIDTH, PAGE_HEIGHT = letter
LEFT = 0.52 * inch
RIGHT = PAGE_WIDTH - 0.52 * inch
BLACK = HexColor("#111111")
MUTED = HexColor("#444444")
ACCENT = HexColor("#b71c1c")


def paragraph_style(size: float, leading: float, bold: bool = False) -> ParagraphStyle:
    return ParagraphStyle(
        name=f"body-{size}-{bold}",
        fontName="Helvetica-Bold" if bold else "Helvetica",
        fontSize=size,
        leading=leading,
        textColor=BLACK,
        alignment=TA_LEFT,
        spaceAfter=0,
    )


def draw_paragraph(
    pdf: canvas.Canvas,
    text: str,
    y: float,
    width: float = RIGHT - LEFT,
    size: float = 8.7,
    leading: float = 11.1,
    bold: bool = False,
) -> float:
    block = Paragraph(text, paragraph_style(size, leading, bold))
    _, height = block.wrap(width, PAGE_HEIGHT)
    block.drawOn(pdf, LEFT, y - height)
    return y - height


def draw_section(pdf: canvas.Canvas, title: str, y: float) -> float:
    y -= 8
    pdf.setFillColor(BLACK)
    pdf.setFont("Helvetica-Bold", 10.2)
    pdf.drawString(LEFT, y, title.upper())
    pdf.setStrokeColor(ACCENT)
    pdf.setLineWidth(1.2)
    pdf.line(LEFT, y - 3, RIGHT, y - 3)
    return y - 11


def draw_bullet(pdf: canvas.Canvas, text: str, y: float) -> float:
    pdf.setFillColor(ACCENT)
    pdf.circle(LEFT + 3, y - 4, 1.5, fill=1, stroke=0)
    block = Paragraph(text, paragraph_style(8.35, 10.25))
    width = RIGHT - LEFT - 15
    _, height = block.wrap(width, PAGE_HEIGHT)
    block.drawOn(pdf, LEFT + 13, y - height)
    return y - height - 1.5


def draw_link_line(pdf: canvas.Canvas, parts: list[tuple[str, str | None]], y: float) -> None:
    x = LEFT
    pdf.setFont("Helvetica", 8.4)
    pdf.setFillColor(MUTED)
    for index, (label, url) in enumerate(parts):
        if index:
            separator = "  |  "
            pdf.drawString(x, y, separator)
            x += stringWidth(separator, "Helvetica", 8.4)
        pdf.drawString(x, y, label)
        text_width = stringWidth(label, "Helvetica", 8.4)
        if url:
            pdf.linkURL(url, (x, y - 2, x + text_width, y + 9), relative=0)
        x += text_width


def build_resume() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(OUTPUT), pagesize=letter, pageCompression=1)
    pdf.setTitle("Drix Molina Resume")
    pdf.setAuthor("Drix Paulo E. Molina")
    pdf.setSubject("Full-Stack Developer resume")

    y = PAGE_HEIGHT - 0.45 * inch
    pdf.setFillColor(BLACK)
    pdf.setFont("Helvetica-Bold", 23)
    pdf.drawString(LEFT, y, "Drix Molina")
    y -= 17
    pdf.setFont("Helvetica-Bold", 10.5)
    pdf.setFillColor(ACCENT)
    pdf.drawString(LEFT, y, "FULL-STACK DEVELOPER")
    y -= 15

    draw_link_line(
        pdf,
        [
            ("Caloocan, Metro Manila, Philippines", None),
            ("drixmolina31@gmail.com", "mailto:drixmolina31@gmail.com"),
            ("+63 966-792-4142", "tel:+639667924142"),
        ],
        y,
    )
    y -= 13
    draw_link_line(
        pdf,
        [
            ("webfolio-dm.vercel.app", "https://webfolio-dm.vercel.app/"),
            ("github.com/drixmolina", "https://github.com/drixmolina"),
            (
                "linkedin.com/in/drix-molina-a1ba62321",
                "https://www.linkedin.com/in/drix-molina-a1ba62321/",
            ),
        ],
        y,
    )
    y -= 8

    y = draw_section(pdf, "Profile", y)
    y = draw_paragraph(
        pdf,
        "BS Information Technology graduate specializing in Web and Mobile Application "
        "Development. Current Web Developer with experience building responsive React "
        "interfaces and PHP/MySQL-backed academic workflows, supported by system testing, "
        "technical documentation, accessibility, and Git-based delivery.",
        y,
    )

    y = draw_section(pdf, "Technical Skills", y)
    y = draw_paragraph(
        pdf,
        "<b>Frontend:</b> React, TypeScript, JavaScript, HTML5, CSS3, responsive design<br/>"
        "<b>Backend &amp; Data:</b> PHP, MySQL, XAMPP, REST workflows<br/>"
        "<b>Mobile &amp; Quality:</b> Kotlin, Expo Go, system testing, accessibility<br/>"
        "<b>Tools:</b> Git, GitHub, Vercel, Figma, VS Code",
        y,
    )

    y = draw_section(pdf, "Experience", y)
    pdf.setFont("Helvetica-Bold", 9.4)
    pdf.setFillColor(BLACK)
    pdf.drawString(LEFT, y, "Web Developer - Highly Succeed Inc.")
    pdf.setFont("Helvetica", 8.4)
    pdf.setFillColor(MUTED)
    pdf.drawRightString(RIGHT, y, "Dec 2025 - Present | Mandaluyong City")
    y -= 11
    y = draw_bullet(
        pdf,
        "Build reusable React components and responsive screens for an employee and "
        "inventory management system spanning attendance, leave, onboarding, and reporting.",
        y,
    )
    y = draw_bullet(
        pdf,
        "Translate workflow requirements into clear interface states, forms, tables, "
        "role-aware navigation, and accessible interaction feedback.",
        y,
    )
    y = draw_bullet(
        pdf,
        "Debug usability and cross-browser issues and use Git-based delivery workflows "
        "to prepare and publish updates.",
        y,
    )

    y = draw_section(pdf, "Selected Project", y)
    pdf.setFont("Helvetica-Bold", 9.4)
    pdf.setFillColor(BLACK)
    pdf.drawString(LEFT, y, "FacilitEASE - Web and Mobile Property Management System")
    pdf.setFont("Helvetica", 8.4)
    pdf.setFillColor(MUTED)
    pdf.drawRightString(RIGHT, y, "Aug 2024 - Nov 2025")
    y -= 11
    y = draw_bullet(
        pdf,
        "Helped map paper-based facilities processes into seven connected modules for "
        "reservations, job orders, inventory, maintenance, dispatch, and notifications.",
        y,
    )
    y = draw_bullet(
        pdf,
        "Supported PHP/MySQL, Kotlin, JavaScript, XAMPP, and Expo Go development across "
        "web and mobile workflows serving four role groups.",
        y,
    )
    y = draw_bullet(
        pdf,
        "Tested core workflows through documented alpha and beta testing; the project "
        "received Best in Website and Best in Trailer recognition.",
        y,
    )

    y = draw_section(pdf, "Education & Community", y)
    pdf.setFont("Helvetica-Bold", 9.3)
    pdf.setFillColor(BLACK)
    pdf.drawString(LEFT, y, "FEU Diliman")
    pdf.setFont("Helvetica", 8.4)
    pdf.setFillColor(MUTED)
    pdf.drawRightString(RIGHT, y, "2026")
    y -= 11
    y = draw_paragraph(
        pdf,
        "Bachelor of Science in Information Technology - Web and Mobile Application Development",
        y,
        size=8.45,
        leading=10.4,
    )
    y -= 2
    y = draw_paragraph(
        pdf,
        "<b>Junior Associate, Assemblage of Programmers and Developers</b> (2023 - 2026) - "
        "Supported technical activities, collaborative initiatives, and knowledge sharing.",
        y,
        size=8.35,
        leading=10.25,
    )

    y = draw_section(pdf, "Certifications", y)
    y = draw_paragraph(
        pdf,
        "IT Specialist: HTML and CSS (2024), Python (2025), Networking (2024), "
        "Network Security (2025), Device Configuration and Management (2025)",
        y,
        size=8.35,
        leading=10.2,
    )

    if y < 24:
        raise RuntimeError(f"Resume content overflowed the page: final y={y:.1f}")

    pdf.showPage()
    pdf.save()


if __name__ == "__main__":
    build_resume()
