


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






// import { auth } from "@/auth";
// import { query } from "@/config/db";
// import { NextResponse } from "next/server";
// import { PDFDocument, StandardFonts } from "pdf-lib";

// function formatMonthYear(date) {
//   return new Date(date).toLocaleString("en-US", {
//     month: "long",
//     year: "numeric",
//   });
// }


// export async function GET() {
//   try {
//     const session = await auth();
//     if (!session || session.user.role !== "student") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     const sql = `
//       SELECT
//         u.name AS student_name,
//         c.club_name,
//         cm.position,
//         cm.tenure_start,
//         cm.tenure_end
//       FROM club_members cm
//       JOIN users u ON u.id = cm.student_id
//       JOIN clubs c ON c.club_id = cm.club_id
//       WHERE cm.student_id = $1
//         AND cm.status = 'APPROVED'
//       ORDER BY cm.tenure_start;
//     `;

//     const result = await query(sql, [session.user.id]);

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { message: "No verified PORs available" },
//         { status: 404 }
//       );
//     }

//     /* ---------- PDF ---------- */
//     const pdf = await PDFDocument.create();
//     const page = pdf.addPage([595, 842]); // A4
//     const font = await pdf.embedFont(StandardFonts.Helvetica);

//     page.drawText("POSITION OF RESPONSIBILITY CERTIFICATE", {
//       x: 80,
//       y: 780,
//       size: 18,
//       font
//     });

//     const studentName = result.rows[0].student_name;

//     page.drawText(
//       `This is to certify that ${studentName} has successfully held`,
//       { x: 70, y: 740, size: 12, font }
//     );

//     page.drawText(
//       `the following Positions of Responsibility:`,
//       { x: 70, y: 720, size: 12, font }
//     );

//     let y = 680;

//     for (const por of result.rows) {
//       page.drawText(
//         `• ${por.position}, ${por.club_name}`,
//         { x: 80, y, size: 11, font }
//       );

// //       page.drawText(
// //         `Duration: ${new Date(por.tenure_start).toDateString()} 
// // to ${new Date(por.tenure_end).toDateString()}`,
// //         { x: 100, y: y - 18, size: 10, font }
// //       );
//       page.drawText(
//         `Duration: ${formatMonthYear(por.tenure_start)} – ${formatMonthYear(por.tenure_end)}`,
//          { x: 100, y: y - 18, size: 10, font }
//          );



//       y -= 45;

//       if (y < 100) {
//         y = 680;
//         pdf.addPage([595, 842]);
//       }
//     }

//     page.drawText(
//       "All the above positions were duly verified and approved by the institute.",
//       { x: 70, y: 120, size: 10, font }
//     );

//     page.drawText(
//       `Date of Issue: ${new Date().toDateString()}`,
//       { x: 70, y: 90, size: 9, font }
//     );

//     const pdfBytes = await pdf.save();

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "attachment; filename=POR_Certificate.pdf"
//       }
//     });

//   } catch (err) {
//     console.error("POR Error:", err);
//     return NextResponse.json(
//       { message: "Server error" },
//       { status: 500 }
//     );
//   }
// }


// import { auth } from "@/auth";
// import { query } from "@/config/db";
// import { NextResponse } from "next/server";
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// import fs from "fs";
// import path from "path";

// function formatMonthYear(date) {
//   return new Date(date).toLocaleString("en-US", {
//     month: "long",
//     year: "numeric",
//   });
// }

// export async function GET() {
//   try {
//     /* ---------- AUTH ---------- */
//     const session = await auth();
//     if (!session || session.user.role !== "student") {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     /* ---------- DB QUERY ---------- */
//     const sql = `
//       SELECT
//         u.name AS student_name,
//         c.club_name,
//         cm.position,
//         cm.tenure_start,
//         cm.tenure_end
//       FROM club_members cm
//       JOIN users u ON u.id = cm.student_id
//       JOIN clubs c ON c.club_id = cm.club_id
//       WHERE cm.student_id = $1
//         AND cm.status = 'APPROVED'
//       ORDER BY cm.tenure_start;
//     `;

//     const result = await query(sql, [session.user.id]);

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { message: "No verified PORs available" },
//         { status: 404 }
//       );
//     }

//     /* ---------- PDF SETUP ---------- */
//     const pdf = await PDFDocument.create();
//     let page = pdf.addPage([595, 842]); // A4
//     const font = await pdf.embedFont(StandardFonts.Helvetica);
//     const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

//     /* ---------- LOGO ---------- */
//     const logoPath = path.join(process.cwd(), "public", "logo.png");
//     const logoBytes = fs.readFileSync(logoPath);
//     const logo = await pdf.embedPng(logoBytes);
//     const logoDims = logo.scale(0.15);

//     page.drawImage(logo, {
//       x: (595 - logoDims.width) / 2,
//       y: 785,
//       width: logoDims.width,
//       height: logoDims.height,
//     });

//     /* ---------- HEADER ---------- */
//     page.drawText("XYZ INSTITUTE OF TECHNOLOGY", {
//       x: 120,
//       y: 750,
//       size: 16,
//       font: boldFont,
//     });

//     page.drawText("Office of Student Affairs", {
//       x: 205,
//       y: 730,
//       size: 10,
//       font,
//     });

//     page.drawText("POSITION OF RESPONSIBILITY CERTIFICATE", {
//       x: 70,
//       y: 700,
//       size: 18,
//       font: boldFont,
//     });

//     page.drawLine({
//       start: { x: 70, y: 685 },
//       end: { x: 525, y: 685 },
//       thickness: 1,
//       color: rgb(0.8, 0.8, 0.8),
//     });

//     /* ---------- BODY ---------- */
//     const studentName = result.rows[0].student_name;

//     page.drawText("This is to certify that", {
//       x: 70,
//       y: 655,
//       size: 12,
//       font,
//     });

//     page.drawText(studentName.toUpperCase(), {
//       x: 70,
//       y: 630,
//       size: 14,
//       font: boldFont,
//     });

//     page.drawText(
//       "has successfully held the following Positions of Responsibility during their academic tenure:",
//       {
//         x: 70,
//         y: 605,
//         size: 12,
//         font,
//       }
//     );

//     page.drawLine({
//       start: { x: 70, y: 590 },
//       end: { x: 525, y: 590 },
//       thickness: 0.8,
//       color: rgb(0.85, 0.85, 0.85),
//     });

//     /* ---------- POR LIST ---------- */
//     let y = 560;

//     for (const por of result.rows) {
//       if (y < 170) {
//         page = pdf.addPage([595, 842]);
//         y = 760;
//       }

//       page.drawText(
//         `• ${por.position} — ${por.club_name}`,
//         {
//           x: 90,
//           y,
//           size: 11,
//           font: boldFont,
//         }
//       );

//       page.drawText(
//         `Duration: ${formatMonthYear(por.tenure_start)} – ${formatMonthYear(
//           por.tenure_end
//         )}`,
//         {
//           x: 110,
//           y: y - 16,
//           size: 10,
//           font,
//         }
//       );

//       y -= 45;
//     }

//     /* ---------- FOOTER ---------- */
//     page.drawLine({
//       start: { x: 70, y: 150 },
//       end: { x: 525, y: 150 },
//       thickness: 0.8,
//       color: rgb(0.85, 0.85, 0.85),
//     });

//     page.drawText(
//       "All the above positions were duly verified and approved by the institute.",
//       {
//         x: 70,
//         y: 130,
//         size: 10,
//         font,
//       }
//     );

//     page.drawText(`Date of Issue: ${new Date().toDateString()}`, {
//       x: 70,
//       y: 100,
//       size: 9,
//       font,
//     });

//     page.drawText("__________________________", {
//       x: 70,
//       y: 70,
//       size: 9,
//       font,
//     });

//     page.drawText("Faculty In-Charge", {
//       x: 70,
//       y: 55,
//       size: 9,
//       font,
//     });

//     page.drawText("Institute Seal", {
//       x: 430,
//       y: 55,
//       size: 9,
//       font,
//     });

//     /* ---------- RESPONSE ---------- */
//     const pdfBytes = await pdf.save();

//     return new NextResponse(pdfBytes, {
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition":
//           "attachment; filename=POR_Certificate.pdf",
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

function formatMonthYear(date) {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export async function GET() {
  try {
    /* ---------- AUTH ---------- */
    const session = await auth();
    if (!session || session.user.role !== "student") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    /* ---------- DB ---------- */
    const sql = `
      SELECT
        u.name AS student_name,
        c.club_name,
        cm.position,
        cm.tenure_start,
        cm.tenure_end
      FROM club_members cm
      JOIN users u ON u.id = cm.student_id
      JOIN clubs c ON c.club_id = cm.club_id
      WHERE cm.student_id = $1
        AND cm.status = 'APPROVED'
      ORDER BY cm.tenure_start;
    `;

    const result = await query(sql, [session.user.id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "No verified PORs available" },
        { status: 404 }
      );
    }

    /* ---------- PDF SETUP ---------- */
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([595, 842]); // A4

    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

    const studentName = result.rows[0].student_name;

    /* ---------- OUTER BORDER ---------- */
    page.drawRectangle({
      x: 40,
      y: 40,
      width: 515,
      height: 762,
      borderColor: rgb(0.75, 0.75, 0.75),
      borderWidth: 1.5,
    });

    /* ---------- HEADER ---------- */
    page.drawText("INDIAN INSTITUTE OF TECHNOLOGY INDORE", {
      x: 80,
      y: 720,
      size: 16,
      font: boldFont,
    });

    page.drawText("Students’ Gymkhana", {
      x: 240,
      y: 698,
      size: 11,
      font,
    });

    page.drawText("POSITION OF RESPONSIBILITY CERTIFICATE", {
      x: 85,
      y: 660,
      size: 18,
      font: boldFont,
    });

    page.drawLine({
      start: { x: 100, y: 645 },
      end: { x: 495, y: 645 },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7),
    });

    /* ---------- STUDENT NAME ---------- */
    page.drawText("This is to certify that", {
      x: 205,
      y: 610,
      size: 12,
      font,
    });

    const nameX = (595 - studentName.length * 8) / 2;

    page.drawText(studentName.toUpperCase(), {
      x: nameX,
      y: 580,
      size: 16,
      font: boldFont,
    });

    /* ---------- BODY TEXT ---------- */
    page.drawText(
      "has successfully held the following Positions of Responsibility under the Students’ Gymkhana, IIT Indore:",
      {
        x: 90,
        y: 545,
        size: 12,
        font,
        maxWidth: 415,
        lineHeight: 16,
      }
    );

    /* ---------- POR BOX ---------- */
    page.drawRectangle({
      x: 80,
      y: 350,
      width: 435,
      height: 170,
      borderColor: rgb(0.85, 0.85, 0.85),
      borderWidth: 1,
    });

    let y = 490;

    for (const por of result.rows) {
      page.drawText(
        `${por.position} — ${por.club_name}`,
        {
          x: 100,
          y,
          size: 12,
          font: boldFont,
        }
      );

      page.drawText(
        `Duration: ${formatMonthYear(por.tenure_start)} – ${formatMonthYear(
          por.tenure_end
        )}`,
        {
          x: 100,
          y: y - 18,
          size: 10,
          font,
        }
      );

      y -= 45;
    }

    /* ---------- VERIFICATION ---------- */
    page.drawText(
      "All the above positions were duly verified and approved by the Students’ Gymkhana, IIT Indore.",
      {
        x: 90,
        y: 310,
        size: 10,
        font,
        maxWidth: 415,
        lineHeight: 14,
      }
    );

    /* ---------- SIGNATURE SECTION ---------- */
    page.drawLine({
      start: { x: 90, y: 200 },
      end: { x: 260, y: 200 },
      thickness: 1,
    });

    page.drawLine({
      start: { x: 335, y: 200 },
      end: { x: 505, y: 200 },
      thickness: 1,
    });

    page.drawText("Dean, Students’ Affairs", {
      x: 105,
      y: 180,
      size: 10,
      font,
    });

    page.drawText("Students’ Gymkhana Seal", {
      x: 355,
      y: 180,
      size: 10,
      font,
    });

    page.drawText(`Date of Issue: ${new Date().toDateString()}`, {
      x: 230,
      y: 145,
      size: 9,
      font,
    });

    /* ---------- RESPONSE ---------- */
    const pdfBytes = await pdf.save();

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

