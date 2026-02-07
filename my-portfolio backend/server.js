import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { appendToSheet } from "./sheets.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*", // later you can restrict this
}));
app.use(express.json());
// Ensure the response header is set correctly
// app.use((req, res, next) => {
//   res.setHeader('Content-Type', 'text/javascript');
//   next();
// });

app.post("/api/contact", async (req, res) => {
  console.log("🔥 HIT /api/contact");
  console.log("BODY:", req.body);

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.log("❌ Missing fields");
      return res.status(400).json({ success: false });
    }

    console.log("✅ Before Google Sheets");

    await appendToSheet({ name, email, message });

    console.log("✅ After Google Sheets");

    res.status(200).json({ success: true });
  } catch (err) {
    console.log("❌ CATCH BLOCK ERROR");
    console.error(err);
    res.status(500).json({ success: false });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
