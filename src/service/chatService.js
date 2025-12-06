import Chat from "../models/Chat.js";
import Case from "../models/Case.js";

export async function getChat(caseId) {
  return Chat.findOne({ caseId }).populate(
    "participants",
    "fullName role avatar"
  );
}

export async function createChat(caseId) {
  const existingChat = await Chat.findOne({ caseId });
  if (existingChat) {
    throw new Error("Chat already exists");
  }

  const caseData = await Case.findById(caseId);
  if (!caseData) {
    throw new Error("Case not found");
  }

  const chat = await Chat.create({
    caseId,
    participants: [caseData.clientId, caseData.lawyerId],
    messages: [],
  });

  return chat;
}

export async function sendMessage(caseId, userId, messageText) {
  const chat = await createChatIfNotExists(caseId);

  if (!chat.participants.some((p) => p.toString() === userId.toString())) {
    throw new Error("Unauthorized");
  }

  const newMessage = {
    senderId: userId,
    message: messageText,
  };

  chat.messages.push(newMessage);
  await chat.save();

  return newMessage;
}

export async function markSeen(caseId) {
  await Chat.updateOne({ caseId }, { $set: { "messages.$[].isSeen": true } });

  return { message: "Seen updated" };
}
