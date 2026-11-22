from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether


OUT = "API_DOCUMENTATION.pdf"
GREEN = colors.HexColor("#0B6E4F")
LIGHT_GREEN = colors.HexColor("#E8F1ED")
GRID = colors.HexColor("#CCD6D0")
INK = colors.HexColor("#20242A")


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(GRID)
    canvas.line(14 * mm, 12 * mm, 196 * mm, 12 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#68736D"))
    canvas.drawString(14 * mm, 8 * mm, "TraverseBD - Backend API Documentation")
    canvas.drawRightString(196 * mm, 8 * mm, f"Page {doc.page}")
    canvas.restoreState()


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleGreen", parent=styles["Title"], fontName="Helvetica-Bold",
                          fontSize=15, leading=18, textColor=GREEN, alignment=TA_LEFT,
                          spaceAfter=3))
styles.add(ParagraphStyle(name="SectionGreen", parent=styles["Heading2"], fontName="Helvetica-Bold",
                          fontSize=9.5, leading=11, textColor=GREEN,
                          borderWidth=0, borderPadding=(0, 0, 1, 0),
                          borderColor=colors.HexColor("#DCE8E2"), spaceBefore=4, spaceAfter=2))
styles.add(ParagraphStyle(name="BodySmall", parent=styles["BodyText"], fontName="Helvetica",
                          fontSize=7.2, leading=8.5, textColor=INK, spaceAfter=2))
styles.add(ParagraphStyle(name="CodeSmall", parent=styles["BodyText"], fontName="Courier",
                          fontSize=6.4, leading=7.2, textColor=INK,
                          backColor=colors.HexColor("#F5F7F6"),
                          borderColor=GREEN, borderWidth=0.7,
                          borderPadding=(3, 4, 3, 4), spaceBefore=1, spaceAfter=3))
styles.add(ParagraphStyle(name="TableHead", parent=styles["BodyText"], fontName="Helvetica-Bold",
                          fontSize=6.8, leading=7.5, textColor=INK))
styles.add(ParagraphStyle(name="TableCell", parent=styles["BodyText"], fontName="Helvetica",
                          fontSize=6.8, leading=7.5, textColor=INK))
styles.add(ParagraphStyle(name="MethodGet", parent=styles["TableCell"], textColor=colors.HexColor("#0B6E4F"),
                          fontName="Helvetica-Bold"))
styles.add(ParagraphStyle(name="MethodPost", parent=styles["TableCell"], textColor=colors.HexColor("#1D4ED8"),
                          fontName="Helvetica-Bold"))
styles.add(ParagraphStyle(name="MethodPut", parent=styles["TableCell"], textColor=colors.HexColor("#B45309"),
                          fontName="Helvetica-Bold"))
styles.add(ParagraphStyle(name="MethodDelete", parent=styles["TableCell"], textColor=colors.HexColor("#B91C1C"),
                          fontName="Helvetica-Bold"))


def P(text):
    return Paragraph(text, styles["BodySmall"])


def code(text):
    return Paragraph(text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"), styles["CodeSmall"])


def endpoint_table(rows):
    data = [[Paragraph("Method", styles["TableHead"]),
             Paragraph("Endpoint", styles["TableHead"]),
             Paragraph("Purpose", styles["TableHead"]) ]]
    method_styles = {"GET": "MethodGet", "POST": "MethodPost",
                     "PUT": "MethodPut", "DELETE": "MethodDelete",
                     "GET / POST / PUT / DELETE": "MethodDelete"}
    for method, endpoint, purpose in rows:
        style_name = method_styles.get(method, "TableCell")
        data.append([
            Paragraph(method, styles[style_name]),
            Paragraph(endpoint, styles["TableCell"]),
            Paragraph(purpose, styles["TableCell"])
        ])
    table = Table(data, colWidths=[17 * mm, 73 * mm, 82 * mm], repeatRows=1)
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), LIGHT_GREEN),
        ("TEXTCOLOR", (0, 0), (-1, 0), INK),
        ("GRID", (0, 0), (-1, -1), 0.25, GRID),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2),
        ("TOPPADDING", (0, 0), (-1, -1), 1.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1.5),
    ]))
    return table


def title():
    return [
        Paragraph("TraverseBD Backend API Documentation", styles["TitleGreen"]),
        P("<b>Spring Boot Backend - Supabase PostgreSQL + Storage</b><br/>"
          "Version: 1.0 | Date: 23 November 2026 | Owner: Sifat Mazib"),
        P("This document describes the REST API contract for frontend integration. "
          "Protected admin endpoints require a JWT returned by login or Google sign-in.")
    ]


story = []
story += title()
story += [
    Paragraph("Base URL and Authentication", styles["SectionGreen"]),
    P("<b>Local:</b> http://localhost:8080<br/><b>Production:</b> https://&lt;deployed-backend-domain&gt;<br/>"
      "<b>Protected header:</b> Authorization: Bearer &lt;JWT&gt;"),
    P("The backend also sets an HTTP-only <b>ADMIN_SESSION</b> cookie. Cookie and bearer authentication are accepted."),
    Paragraph("Authentication", styles["SectionGreen"]),
    endpoint_table([
        ("POST", "/api/auth/login", "Public email/password login; returns JWT and profile."),
        ("POST", "/api/auth/google", "Public Google sign-in; account must already be provisioned."),
        ("POST", "/api/auth/logout", "Clear the HTTP-only session cookie."),
    ]),
    P("<b>Login request</b>"),
    code('{"email":"admin@traversebd.local","password":"Admin@123456"}'),
    P("<b>Google request</b>"),
    code('{"idToken":"&lt;Google ID token&gt;"}'),
    P("<b>Authentication response</b>"),
    code('{"accessToken":"JWT","email":"admin@traversebd.local","role":"SUPER_ADMIN"}'),
    P("JWTs expire after 60 minutes by default. Normal staff use <b>ADMIN</b>; the seed account uses <b>SUPER_ADMIN</b>."),
    Paragraph("Admin Users", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/admin/users", "SUPER_ADMIN list all admin users."),
        ("POST", "/api/admin/users", "SUPER_ADMIN provision an ADMIN or SUPER_ADMIN account."),
        ("PUT", "/api/admin/users/{id}", "SUPER_ADMIN update role, email or active status."),
        ("DELETE", "/api/admin/users/{id}", "SUPER_ADMIN delete a user; the last active Super Admin is protected."),
    ]),
    code('{"email":"staff@example.com","password":"optional","role":"ADMIN"}'),
]

story.append(PageBreak())
story += title()
story += [
    Paragraph("Destinations", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/destinations", "Public published destinations."),
        ("GET", "/api/public/destinations/{slug}", "Public published destination detail."),
        ("GET", "/api/admin/destinations", "Admin list including drafts."),
        ("POST", "/api/admin/destinations", "Admin create destination."),
        ("PUT", "/api/admin/destinations/{id}", "Admin update destination."),
        ("DELETE", "/api/admin/destinations/{id}", "Admin delete destination."),
    ]),
    code('{"name":"Coxs Bazar","slug":"optional","region":"Chattogram","shortDescription":"Short text",'
         '"fullDescription":"Full text","coverImageUrl":"https://...","highlights":"Beach; Seafood",'
         '"status":"DRAFT|PUBLISHED","featured":true}'),
    Paragraph("Categories", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/categories", "Public published categories, sorted."),
        ("GET", "/api/admin/categories", "Admin list including drafts."),
        ("POST", "/api/admin/categories", "Admin create category."),
        ("PUT", "/api/admin/categories/{id}", "Admin update category."),
        ("DELETE", "/api/admin/categories/{id}", "Blocked while packages use the category."),
    ]),
    code('{"name":"Beach","slug":"optional","status":"PUBLISHED","sortOrder":1}'),
    Paragraph("Packages", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/packages", "Published packages; optional destinationId, categoryId, minPrice, maxPrice and durationDays."),
        ("GET", "/api/public/packages/{slug}", "Published package detail."),
        ("GET", "/api/admin/packages", "Admin list including drafts."),
        ("POST", "/api/admin/packages", "Admin create package."),
        ("PUT", "/api/admin/packages/{id}", "Admin update package."),
        ("DELETE", "/api/admin/packages/{id}", "Admin delete package."),
    ]),
    P("<b>Package contract</b>"),
    code('{"title":"Sundarbans 3 Day","slug":"optional","destinationId":"uuid","categoryId":"uuid",'
         '"price":12500,"durationDays":3,"priceMode":"FIXED|STARTING_FROM","shortDescription":"Short",'
         '"fullDescription":"Full","coverImageUrl":"https://...","status":"DRAFT|PUBLISHED",'
         '"featured":true,"trending":false,"items":[{"type":"included","text":"Transport","sortOrder":1}]}'),
]

story.append(PageBreak())
story += title()
story += [
    Paragraph("Departures", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/packages/{packageId}/departures", "Public package departures."),
        ("GET", "/api/admin/departures", "Admin list departures."),
        ("POST", "/api/admin/departures", "Admin create departure and seat totals."),
        ("PUT", "/api/admin/departures/{id}", "Admin update departure."),
        ("DELETE", "/api/admin/departures/{id}", "Admin delete departure."),
    ]),
    code('{"packageId":"uuid","departureDate":"2026-12-10","totalSeats":30,"bookedSeats":0,"priceOverride":null}'),
    P("Booked seats must not exceed total seats. Departure management is manual; the API never creates a booking or reservation."),
    Paragraph("Gallery", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/gallery", "Published, sorted gallery images."),
        ("GET", "/api/admin/gallery", "Admin list all gallery images."),
        ("POST", "/api/admin/gallery", "Admin create image record."),
        ("PUT", "/api/admin/gallery/{id}", "Admin update image record."),
        ("DELETE", "/api/admin/gallery/{id}", "Admin delete image record."),
    ]),
    code('{"imageUrl":"https://...","caption":"Caption","status":"PUBLISHED","sortOrder":1}'),
    Paragraph("Blog", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/blog", "Published posts, newest first."),
        ("GET", "/api/public/blog/{slug}", "Published post detail."),
        ("GET", "/api/admin/blog", "Admin list including drafts."),
        ("POST", "/api/admin/blog", "Admin create post."),
        ("PUT", "/api/admin/blog/{id}", "Admin update post."),
        ("DELETE", "/api/admin/blog/{id}", "Admin delete post."),
    ]),
    code('{"title":"Travel Stories","slug":"optional","excerpt":"Summary","content":"Post body",'
         '"coverImageUrl":"https://...","status":"PUBLISHED"}'),
    Paragraph("Publish Status Contract", styles["SectionGreen"]),
    P("Every public content type uses <b>DRAFT</b> or <b>PUBLISHED</b>. Public endpoints exclude drafts."
      " Publishing or unpublishing is effective immediately."),
]

story.append(PageBreak())
story += title()
story += [
    Paragraph("Settings and Dashboard", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/settings", "Public organization and WhatsApp settings."),
        ("GET", "/api/admin/settings", "Admin settings list."),
        ("PUT", "/api/admin/settings", "Admin update settings map."),
        ("GET", "/api/admin/dashboard", "Admin content and user counts."),
    ]),
    code('{"settings":{"whatsapp_number":"8801700000000","whatsapp_message":"Hello!",'
         '"contact_phone":"8801700000000","contact_email":"hello@traversebd.com"}}'),
    Paragraph("Media Upload", styles["SectionGreen"]),
    endpoint_table([
        ("POST", "/api/admin/media/upload", "Multipart file; JPG, PNG or WebP; maximum 5 MB."),
        ("DELETE", "/api/admin/media?objectName={name}", "Delete a Supabase Storage object."),
    ]),
    code('{"url":"https://&lt;project&gt;.supabase.co/storage/v1/object/public/tourism-media/&lt;uuid&gt;.jpg",'
         '"objectName":"&lt;uuid&gt;.jpg"}'),
    Paragraph("Testimonials, Services and FAQ", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/testimonials", "Published testimonials."),
        ("GET / POST / PUT / DELETE", "/api/admin/testimonials[/id]", "Admin testimonial CRUD."),
        ("GET", "/api/public/services", "Published, sorted services."),
        ("GET / POST / PUT / DELETE", "/api/admin/services[/id]", "Admin service CRUD."),
        ("GET", "/api/public/faqs", "Published, sorted FAQ entries."),
        ("GET / POST / PUT / DELETE", "/api/admin/faqs[/id]", "Admin FAQ CRUD."),
    ]),
    Paragraph("Search", styles["SectionGreen"]),
    endpoint_table([
        ("GET", "/api/public/search?q=Cox", "Search published destinations and packages."),
    ]),
    code('{"destinations":[...],"packages":[...]}'),
    Paragraph("Error Responses", styles["SectionGreen"]),
    P("400 validation/bad request, 401 unauthorized, 403 forbidden, 404 missing resource, 409 conflict, 503 integration unavailable."),
    code('{"error":"VALIDATION_ERROR|CONFLICT|BAD_REQUEST","message":"Human-readable detail"}'),
]


doc = SimpleDocTemplate(
    OUT, pagesize=A4,
    rightMargin=14 * mm, leftMargin=14 * mm,
    topMargin=10 * mm, bottomMargin=15 * mm,
    title="TraverseBD Backend API Documentation",
)
doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
