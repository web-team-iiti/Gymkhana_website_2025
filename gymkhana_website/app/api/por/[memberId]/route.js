


// import { auth } from "@/auth";
// import { query } from "@/config/db";
// import { NextResponse } from "next/server";
// import { PDFDocument, StandardFonts } from "pdf-lib";

// export async function GET(req, { params }) {
//   try {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const memberId = params.memberId;

//     const sql = `
//       SELECT 
//         u.name AS student_name,
//         c.club_name,
//         cm.position,
//         cm.approved_at
//       FROM club_members cm
//       JOIN users u ON u.id = cm.student_id
//       JOIN clubs c ON c.club_id = cm.club_id
//       WHERE cm.member_id = $1
//         AND cm.status = 'APPROVED'
//         AND cm.student_id = $2
//     `;

//     const result = await query(sql, [memberId, session.user.id]);

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { message: "POR certificate not available" },
//         { status: 404 }
//       );
//     }

//     const data = result.rows[0];

//     // 🧾 Generate PDF
//     const pdf = await PDFDocument.create();
//     const page = pdf.addPage([600, 400]);
//     const font = await pdf.embedFont(StandardFonts.Helvetica);

//     page.drawText("Position of Responsibility Certificate", {
//       x: 120,
//       y: 340,
//       size: 18,
//       font
//     });

//     page.drawText(
//       `This is to certify that ${data.student_name}`,
//       { x: 80, y: 280, size: 12, font }
//     );

//     page.drawText(
//       `served as ${data.position} in ${data.club_name}.`,
//       { x: 80, y: 250, size: 12, font }
//     );

//     page.drawText(
//       `Approved on: ${new Date(data.approved_at).toDateString()}`,
//       { x: 80, y: 210, size: 10, font }
//     );

//     const pdfBytes = await pdf.save();

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "attachment; filename=POR_Certificate.pdf",
//       },
//     });

//   } catch (err) {
//     console.error("POR Error:", err);
//     return NextResponse.json(
//       { message: "Server error" },
//       { status: 500 }
//     );
//   }
// }





import { auth } from "@/auth";
import { query } from "@/config/db";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const memberId = params.memberId;

    const sql = `
      SELECT 
        u.name AS student_name,
        c.club_name,
        cm.position,
        cm.approved_at
      FROM club_members cm
      JOIN users u ON u.id = cm.student_id
      JOIN clubs c ON c.club_id = cm.club_id
      WHERE cm.member_id = $1
        AND cm.status = 'APPROVED'
        AND cm.student_id = $2
    `;

    const result = await query(sql, [memberId, session.user.id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "POR certificate not available" },
        { status: 404 }
      );
    }

    const { student_name, club_name, position, approved_at } = result.rows[0];

    // 📄 Create PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    // 🔲 Border
    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderWidth: 2,
      borderColor: rgb(0, 0, 0),
    });

    let y = height - 90;

    // 🏛 Header
    page.drawText("GYMKHANA COUNCIL", {
      x: 180,
      y,
      size: 22,
      font: boldFont,
    });

    y -= 30;

    page.drawText("Indian Institute of Technology", {
      x: 165,
      y,
      size: 14,
      font,
    });

    y -= 60;

    // 📜 Title
    page.drawText("CERTIFICATE OF RESPONSIBILITY", {
      x: 110,
      y,
      size: 20,
      font: boldFont,
    });

    y -= 60;

    // 📄 Body
    const lines = [
      "This is to certify that",
      "",
      student_name,
      "",
      `has successfully served as`,
      "",
      `${position}, ${club_name}`,
      "",
      "during the academic year 2024–2025.",
      "",
      "The performance and conduct were found to be satisfactory.",
    ];

    lines.forEach((line) => {
      page.drawText(line, {
        x: 100,
        y,
        size:
          line === student_name || line.includes(position)
            ? 14
            : 12,
        font:
          line === student_name || line.includes(position)
            ? boldFont
            : font,
      });
      y -= 24;
    });

    // 📅 Date
    page.drawText(
      `Date of Issue: ${new Date(approved_at).toDateString()}`,
      {
        x: 100,
        y: 220,
        size: 12,
        font,
      }
    );

    // ✍️ Signatures
    page.drawLine({
      start: { x: 100, y: 160 },
      end: { x: 260, y: 160 },
      thickness: 1,
    });

    page.drawText("Club Head", {
      x: 140,
      y: 140,
      size: 11,
      font,
    });

    page.drawLine({
      start: { x: 330, y: 160 },
      end: { x: 490, y: 160 },
      thickness: 1,
    });

    page.drawText("General Secretary", {
      x: 360,
      y: 140,
      size: 11,
      font,
    });

    // 💾 Save
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=POR_Certificate.pdf",
      },
    });

  } catch (err) {
    console.error("POR Error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

