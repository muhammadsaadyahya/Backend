import AssistantChat from "../models/assistantChat.js";
import {
  getChatResponse,
  summarizeDocument,
  getCaseOutcomePrediction,
} from "../service/ai/geminiClient.js";
import { queryDocuments } from "../service/ai/retrievalService.js";
import { generateAnswer } from "../service/ai/ragAnswerService.js";
import mongoose from "mongoose";
import Document from "../models/Document.js";
import { extractText } from "../utils/extractText.js";
const ASSISTANT_SENDER_ID = new mongoose.Types.ObjectId(
  "64f3e6a1f1e7c42f5a123456"
);

export const chatWithAssistant = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;
    console.log(userId);
    let chat = await AssistantChat.findOne({ participants: userId });

    if (!chat) {
      chat = new AssistantChat({
        participants: userId,
        messages: [],
      });
    }

    chat.messages.push({
      senderId: userId,
      message,
      sentAt: new Date(),
      isSeen: true,
    });

    const lastFiveMessages = chat.messages.slice(-5);
    console.log(lastFiveMessages);
    const formattedMessages = lastFiveMessages.map((msg) => ({
      role:
        msg.senderId && msg.senderId.toString() === userId.toString()
          ? "user"
          : "assistant",
      content: msg.message,
    }));

    const geminiResponse = await getChatResponse(formattedMessages);

    chat.messages.push({
      senderId: ASSISTANT_SENDER_ID,
      message: geminiResponse.reply,
      sentAt: new Date(),
      isSeen: false,
    });

    chat.messages = chat.messages.slice(-5);

    await chat.save();

    res.json({ reply: geminiResponse.reply, messages: chat.messages });
  } catch (error) {
    console.error("Chat Assistant Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const summarizeController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "File is required" });
    }
    const document = await Document.findById(id);
    const filePath = document.filePath;

    const extractedText = await extractText(filePath);

    if (!extractedText || extractedText.trim().length === 0) {
      return res
        .status(400)
        .json({ error: "No extractable text found in document" });
    }

    const summary = await summarizeDocument(extractedText);

    res.json({ summary });
  } catch (error) {
    console.error("Summarize from file error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const predictOutcomeController = async (req, res) => {
  try {
    const { caseDescription } = req.body;

    if (!caseDescription || caseDescription.trim() === "") {
      return res.status(400).json({ error: "Case description is required" });
    }

    const prediction = await getCaseOutcomePrediction(caseDescription);

    res.json({ prediction });
  } catch (error) {
    console.error("Case Outcome Prediction Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export async function ragQueryHandler(req, res) {
  try {
    const docId = req.params.id;
    const { question } = req.body;

    if (!question || !docId)
      return res.status(400).json({ error: "Question and docId are required" });

    const contexts = await queryDocuments(question, docId);

    const answer = await generateAnswer(question, contexts);

    res.json({ answer });
  } catch (err) {
    console.error("RAG query error:", err);
    res.status(500).json({ error: "Failed to answer query" });
  }
}
