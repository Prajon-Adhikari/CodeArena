import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./libs/db.js";

import authRoute from "./routes/user.route.js";
import hackathonRoute from "./routes/hackathon.route.js";
import searchRoutes from "./routes/search.route.js";

dotenv.config();
const app = express();

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

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  connectDB();
});
