import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./libs/db.js";
import { createServer } from "http";
import { Server } from "socket.io";

import authRoute from "./routes/user.route.js";
import hackathonRoute from "./routes/hackathon.route.js";
import searchRoutes from "./routes/search.route.js";
import adminRoutes from "./routes/admin.route.js";

dotenv.config();
const app = express();
const server = createServer(app); // create http server

const allowedOrigins = [
  "http://localhost:5173", // your local frontend port
  "https://code-arena-bay.vercel.app", // your deployed frontend
];

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});

const PORT = process.env.PORT;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin.startsWith("http://localhost:")) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/search", searchRoutes);
app.use("/home", hackathonRoute);
app.use("/menu", adminRoutes);

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  // join user-specific room
  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // send message
  socket.on("sendMessage", (message) => {
    const { sender, receiver, content } = message;
    // emit to receiver’s room
    io.to(receiver).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});

