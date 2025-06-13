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

const app = express();
const port = process.env.PORT ?? 3000;

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(
  cors({
    origin: ["http://localhost:8080", process.env.CLIENT_URL as string],
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
