import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import { errorHandler } from "./middleware/errorHandler.js";
import path from "path";

const app = express();

const allowedOrigins = [
  "http://localhost:8081", // expo mobile
  "http://localhost:5173", // vite web devs
  process.env.FRONTEND_URL!, // production
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // allow credentials from client (cookies, authorization headers, etc.)
  }),
);
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

app.get("/health", (req, res) => {
  res.json({ message: "Server is running!", status: "ok" });
});

// serve frontend in production
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../../web/dist")));

//   app.get("/{*any}", (_, res) => {
//     res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
//   });
// }

export default app;
