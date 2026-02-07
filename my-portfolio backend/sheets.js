import { google } from "googleapis";

const auth =new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});


const sheets = google.sheets({
  version: "v4",
  auth,
});

export const appendToSheet = async ({ name, email, message }) => {
  try {
    const date = new Date().toLocaleString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, email, message, date]],
      },
    });
  } catch (err) {
    console.error("❌ GOOGLE SHEETS ERROR:");
    console.error(err);
    throw err; // force server.js catch
  }
};
