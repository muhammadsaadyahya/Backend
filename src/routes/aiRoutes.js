import express from "express";
import {
  ragQueryHandler,
  chatWithAssistant,
  summarizeController,
  predictOutcomeController,
} from "../controllers/aiController.js";
import { auth } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/rag/:id", auth, ragQueryHandler);
router.post("/ask", auth, chatWithAssistant);
router.post("/summarize/:id", auth, summarizeController);
router.post("/predict", auth, predictOutcomeController);

export default router;
