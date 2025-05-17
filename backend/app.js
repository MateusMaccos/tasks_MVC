import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use("/tasks", taskRoutes);

app.use("/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
