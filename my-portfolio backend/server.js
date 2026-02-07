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
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/javascript');
  next();
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    await appendToSheet({ name, email, message });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
