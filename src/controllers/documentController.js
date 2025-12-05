import fs from "fs";
import path from "path";
import {
  createDocument,
  getDocumentById,
  getDocumentsByUser,
  deleteDocumentById,
  addHistory,
} from "../service/documentService.js";
import { extractText } from "../utils/extractText.js";

export const uploadDocumentController = async (req, res) => {
  try {
    const file = req.file;
    const caseId = req.params.id;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const extractedText = await extractText(file.path);

    const doc = await createDocument({
      originalName: file.originalname,
      caseId: caseId,
      filePath: file.path,
      uploadedBy: req.user.id,
      extractedText,
      history: [{ action: "Uploaded", date: new Date() }],
    });

    res.status(201).json({ message: "Document uploaded", doc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDocumentController = async (req, res) => {
  try {
    const doc = await getDocumentById(req.params.id);

    if (!doc) return res.status(404).json({ message: "Not found" });

    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const downloadDocumentController = async (req, res) => {
  try {
    const doc = await getDocumentById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });

    const filePath = path.resolve(doc.filePath);
    return res.download(filePath, doc.originalName);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDocumentController = async (req, res) => {
  try {
    const doc = await getDocumentById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });

    fs.unlinkSync(doc.filePath);

    await deleteDocumentById(req.params.id);

    res.json({ message: "Document deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
