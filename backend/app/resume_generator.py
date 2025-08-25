from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
import os
import uuid

PAGE_WIDTH, PAGE_HEIGHT = letter
LEFT_MARGIN = 0.75 * inch
RIGHT_MARGIN = PAGE_WIDTH - 0.75 * inch
TOP_MARGIN = PAGE_HEIGHT - 0.75 * inch
BOTTOM_MARGIN = 0.75 * inch
LINE_HEIGHT = 14

def generate_pdf_resume(data, jd_keywords):
    filename = f'resume_{uuid.uuid4().hex}.pdf'
    output_dir = os.path.join(os.path.dirname(__file__), 'static')
    os.makedirs(output_dir, exist_ok=True)
    filepath = os.path.join(output_dir, filename)

    c = canvas.Canvas(filepath, pagesize=letter)

    # Initialize y position here once before nested functions
    y = TOP_MARGIN

    def draw_text(text, font="Helvetica", size=12, bold=False, indent=0, color=HexColor("#000000")):
        nonlocal y
        if y < BOTTOM_MARGIN + LINE_HEIGHT:
            c.showPage()
            y = TOP_MARGIN
        c.setFillColor(color)
        font_name = font + "-Bold" if bold else font
        c.setFont(font_name, size)
        c.drawString(LEFT_MARGIN + indent, y, text)
        y -= LINE_HEIGHT

    def draw_heading(text):
        nonlocal y
        draw_text(text, font="Helvetica", size=14, bold=True, color=HexColor("#003366"))
        y -= 4  # extra space below heading

    # Header: Name & Contact Info
    name = data.get("name", "")
    email = data.get("email", "")
    phone = data.get("phone", "")
    linkedin = data.get("linkedin", "")
    address = data.get("address", "")

    draw_text(name, font="Helvetica", size=20, bold=True, color=HexColor("#2E4053"))
    contact_line = f"Email: {email} | Phone: {phone}"
    draw_text(contact_line, size=10, color=HexColor("#555555"))
    if linkedin:
        draw_text(f"LinkedIn: {linkedin}", size=10, color=HexColor("#555555"))
    if address:
        draw_text(address, size=10, color=HexColor("#555555"))

    y -= 10  # space before next section

    # Education Section
    educations = data.get("education", [])
    if educations:
        draw_heading("Education")
        for edu in educations:
            degree = edu.get("degree", "")
            inst = edu.get("institution", "")
            years = edu.get("years", "")
            line = f"{degree} - {inst} ({years})"
            draw_text(line, indent=10)
        y -= 10  # space between sections

    # Experience Section
    experiences = data.get("experience", [])
    if experiences:
        draw_heading("Experience")
        for exp in experiences:
            role = exp.get("role", "")
            company = exp.get("company", "")
            duration = exp.get("duration", "")
            resp = exp.get("responsibilities", "")
            header_line = f"{role} | {company} | {duration}"
            draw_text(header_line, bold=True, indent=10)
            # Wrap responsibilities to multiple lines if long
            for line in split_text(resp, max_width=80):
                draw_text(line, indent=20, size=10, color=HexColor("#333333"))
            y -= 6
        y -= 10  # space between sections

    # Skills Section
    skills = data.get("skills", "")
    if skills.strip():
        draw_heading("Skills")
        for line in split_text(skills, max_width=80):
            draw_text(line, indent=10)
        y -= 10

    # Certifications Section
    certs = data.get("certifications", "")
    if certs.strip():
        draw_heading("Certifications")
        for line in split_text(certs, max_width=80):
            draw_text(line, indent=10)
        y -= 10

    # Portfolio Section
    portfolio = data.get("portfolio", "")
    if portfolio.strip():
        draw_heading("Portfolio")
        for line in split_text(portfolio, max_width=80):
            draw_text(line, indent=10)
        y -= 10

    c.save()
    return f"/static/{filename}"

def split_text(text, max_width=80):
    """Splits text into lines of roughly max_width characters."""
    words = text.split()
    lines = []
    current_line = ""
    for word in words:
        if len(current_line) + len(word) + 1 <= max_width:
            current_line += (word + " ")
        else:
            lines.append(current_line.strip())
            current_line = word + " "
    if current_line:
        lines.append(current_line.strip())
    return lines
