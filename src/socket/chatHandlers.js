import {
  getChat,
  createChat,
  sendMessage,
  markSeen,
} from "../service/chatService.js";

export default function chatHandlers(io, socket) {
  // User joins a chat room for a given caseId
  socket.on("joinChat", async ({ caseId, userId }) => {
    if (!caseId || !userId) return;

    socket.join(caseId);
    console.log(`User ${userId} joined chat room: ${caseId}`);

    try {
      const chat = await getChat(caseId);
      socket.emit("chatHistory", chat ? chat.messages : []);
    } catch (error) {
      socket.emit("errorMessage", error.message);
    }
  });

  // Explicitly create chat if needed
  socket.on("createChat", async ({ caseId }) => {
    if (!caseId) return;

    try {
      const chat = await createChat(caseId);
      socket.emit("chatCreated", chat);
    } catch (error) {
      socket.emit("errorMessage", error.message);
    }
  });

  // Send message to the chat room (caseId)
  socket.on("sendMessage", async ({ caseId, userId, message }) => {
    if (!caseId || !userId || !message) return;

    try {
      const newMessage = await sendMessage(caseId, userId, message);

      // Broadcast new message to all in the chat room
      io.to(caseId).emit("newMessage", newMessage);
    } catch (error) {
      socket.emit("errorMessage", error.message);
    }
  });

  // Mark all messages as seen in a chat
  socket.on("markSeen", async ({ caseId }) => {
    if (!caseId) return;

    try {
      await markSeen(caseId);

      io.to(caseId).emit("messagesSeen");
    } catch (error) {
      socket.emit("errorMessage", error.message);
    }
  });

  // Typing indicator: notify others in the room that user is typing
  socket.on("typing", ({ caseId, userId }) => {
    if (!caseId || !userId) return;

    // Send to everyone except the sender
    socket.to(caseId).emit("typing", { userId });
  });

  // Typing stopped indicator
  socket.on("stopTyping", ({ caseId, userId }) => {
    if (!caseId || !userId) return;

    socket.to(caseId).emit("stopTyping", { userId });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
}
