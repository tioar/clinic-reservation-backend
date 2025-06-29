// api/submit.js
import { writeToSheet } from "../utils/sheets.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const data = req.body;
    const result = await writeToSheet(data);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("寫入失敗", error);
    res.status(500).json({ success: false, message: error.message });
  }
}

