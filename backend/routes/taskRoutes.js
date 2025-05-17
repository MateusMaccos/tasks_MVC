import express from "express";
import TaskController from "../controllers/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", verifyToken, TaskController.getAll);
router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
