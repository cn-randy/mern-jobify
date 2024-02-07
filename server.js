//* node modules
import "express-async-errors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//* routes
import jobRoutes from "./routes/jobRouter.js";
import authRoutes from "./routes/authRouter.js";
import userRoutes from "./routes/userRouter.js";

//* middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import { authenticateUser } from "./middleware/authMiddleware.js";

//* public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

//* Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
//* routes
app.use("/api/v1/jobs", authenticateUser, jobRoutes);
app.use("/api/v1/users", authenticateUser, userRoutes);
app.use("/api/v1/auth", authRoutes);

// html entry point
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//? not found
app.use("*", (re2, res) => {
  res.status(404).json({ message: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.Port || 5000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => console.log(`Server is listening on port ${port}`));
} catch (err) {
  console.error(err);
  process.exit(1);
}
