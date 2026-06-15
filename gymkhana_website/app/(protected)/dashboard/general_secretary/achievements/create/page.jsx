import React from "react";
import { query } from "@/config/db";
import CreateAchievementForm from "@/components/CreateAchievementForm";

export default async function CreateAchievementPage() {
  const sql = "SELECT id, name FROM councils ORDER BY name ASC";
  let councils = [];
  try {
      const res = await query(sql);
      councils = res.rows;
  } catch (error) {
      console.error(error);
  }

  return <CreateAchievementForm councils={councils} />;
}
