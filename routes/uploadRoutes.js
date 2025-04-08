import express from "express";
import multer from "multer";
import PdfModel from "../models/PdfModel.js";
import { uploadPDFToCloudinary } from "../utils/CloudinaryPDF.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Upload PDF
router.post("/upload", upload.single("pdf"), async (req, res) => {
  const { title } = req.body;

  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Upload to Cloudinary
    const { secure_url } = await uploadPDFToCloudinary(req.file, "monthly_reports");

    // Save to database
    const newPdf = new PdfModel({
      pdfUrl: secure_url, // Save only the secure URL
      title,
      originalName: req.file.originalname, // Save the original file name
    });
    await newPdf.save();

    res.status(201).json({ message: "PDF uploaded successfully", pdf: newPdf });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ error: "Failed to upload PDF" });
  }
});

// Fetch all PDFs grouped by title
router.get("/all", async (req, res) => {
  try {
    const pdfs = await PdfModel.find();
    const groupedPdfs = pdfs.reduce((acc, pdf) => {
      if (!acc[pdf.title]) acc[pdf.title] = [];
      acc[pdf.title].push(pdf);
      return acc;
    }, {});
    res.json(groupedPdfs);
  } catch (error) {
    console.error("Error fetching PDFs:", error);
    res.status(500).json({ error: "Failed to fetch PDFs" });
  }
});

export default router;
