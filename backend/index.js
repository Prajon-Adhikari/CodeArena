import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./libs/db.js";

import authRoute from "./routes/user.route.js";
import hackathonRoute from "./routes/hackathon.route.js";
import profileRoutes from "./routes/profile.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/home", hackathonRoute);

app.use("/api/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  connectDB();
});
