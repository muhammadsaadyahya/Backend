# LegalMind — Backend API ⚖️

The Node.js/Express backend of **[LegalMind](https://github.com/muhammadsaadyahya/LegalMind)**, an AI legal practice management system. The full project (frontend, backend and demo video) lives in the LegalMind repository; this repo holds the backend on its own.

## ✨ What it does

- **Authentication and role-based access:** JWT login and middleware for three roles: Admin, Lawyer and Client.
- **Case management:** CRUD for cases plus an AI-powered case outcome predictor.
- **Document RAG:** uploaded legal PDFs are parsed, split into chunks, embedded with Google Gemini and stored in Pinecone. Questions in natural language are answered from the top matching chunks.
- **Real-time chat:** lawyer–client messaging with Socket.io.
- **AI assistant:** conversational assistant for drafting and quick legal questions.
- **Cash flow and notifications:** fees, expenses and user notifications.

## 🗂 Structure

```text
src/
├── config/        # MongoDB and Pinecone clients
├── controllers/   # auth, users, cases, documents, search, ai, chat, cash flow, notifications
├── middlewares/   # JWT auth, role checks, file uploads (Multer)
├── models/        # Mongoose schemas
├── routes/        # Express routers
├── service/       # business logic and AI services
├── socket/        # Socket.io chat handlers
└── utils/         # PDF text extraction, text chunker, JWT helpers
```

## 💻 Tech Stack

Node.js · Express 5 · MongoDB (Mongoose) · JWT · bcryptjs · Socket.io · Multer · pdf-parse · Google Gemini · Pinecone

## 🚀 Run locally

```bash
npm install
# create a .env file with: MONGO_URI, JWT_SECRET, GEMINI_API_KEY, PINECONE_API_KEY
npm run dev
```

The server runs on port 5000 by default.
