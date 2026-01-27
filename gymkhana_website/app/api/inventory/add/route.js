import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";

export async function POST(req) {
  try {
    const session = await auth();

    // 1. Security Check: Ensure role matches your DB ('general_secretary')
    if (!session || session.user.role !== 'gs') {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    // 2. Extract Data (No file handling needed)
    const name = formData.get("name");
    const council = formData.get("council");
    const club_name = formData.get("club_name");
    const tenure = formData.get("tenure");
    const type = formData.get("type");
    const description = formData.get("description");

    // 3. Validation
    if (!name || !council || !type || !tenure) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 4. Data Formatting
    // Convert empty club name to NULL for cleaner database storage
    const finalClubName = club_name && club_name.trim() !== "" ? club_name : null;
    const formattedCouncil = council.toUpperCase();

    // 5. Database Insert
    // Note: We removed 'bill_url' because bills are now handled in the Bills Tab
    const sql = `
      INSERT INTO inventory (name, description, council, club_name, tenure, type, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const result = await query(sql, [
      name,
      description,
      formattedCouncil,
      finalClubName,
      tenure,
      type,
      session.user.id
    ]);

    return NextResponse.json({
      message: "Item added successfully",
      id: result.rows[0].id
    }, { status: 201 });

  } catch (error) {
    console.error("Inventory Add Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}