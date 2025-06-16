import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();

import express, { urlencoded } from "express";
import type { Response } from "express";
import { toNodeHandler } from "better-auth/node";
import auth from "./config/auth";
import router from "./routes/Auth.route";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db";
import { env } from "./zod/env.schema";

const app = express();
const port = env.PORT;

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(
  cors({
    origin: ["http://localhost:8080", env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/v1/users", router);

app.get("/stats", (_, res: Response) => {
  res.json({
    message: "Server Up",
  });
});

const startServer = async () => {
  try {
    connectDB();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
