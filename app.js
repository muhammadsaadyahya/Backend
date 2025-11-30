import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import connectDB from "./src/config/db.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.listen(5000, () => console.log("Server running on port 5000"));
