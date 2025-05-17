import express from "express";
import TaskController from "../controllers/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", verifyToken, TaskController.getAll);
router.post("/", verifyToken, TaskController.create);
router.put("/:id", verifyToken, TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
