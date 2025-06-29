import { google } from "googleapis";
import credentials from "../credentials/service-account.json" assert { type: "json" };

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "12bUbyhwHI7rGHfCO9JmMAljhfs80TQQ6kcIyX09BSGw";
const SHEET_NAME = "預約紀錄";

export async function writeToSheet(data) {
  const { date, session, visitType, name, birthday, idNumber, phone } = data;
  const values = [[date, session, visitType, name, birthday, idNumber, phone, new Date().toISOString()]];

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:H`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  });

  return res.data.updates;
}

