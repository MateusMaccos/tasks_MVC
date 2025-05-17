import express from "express";
import UserController from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", UserController.getAll);
router.get("/user", verifyToken, UserController.getOne);
router.post("/", UserController.create);
router.delete("/:id", UserController.delete);
router.get("/check-auth", UserController.checkAuth);
router.post("/login", UserController.login);
router.post("/logout", verifyToken, UserController.logout);

export default router;
