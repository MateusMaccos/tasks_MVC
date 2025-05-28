import express from "express";
import UserController from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";
import upload from "../middleware/uploadConfig.js";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Usuários retornados com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get("/", UserController.getAll);

/**
 * @swagger
 * /users/user/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *       404:
 *         description: Usuário nao encontrado
 *       401:
 *         description: Não autorizado
 */
router.get("/user", verifyToken, UserController.getOne);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               name: John Doe
 *               email: 2yHxW@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: O nome, email e senha são obrigatórios
 *       409:
 *         description: Email ja cadastrado
 */
router.post("/", UserController.create);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 */
router.delete("/:id", UserController.delete);
router.get("/check-auth", UserController.checkAuth);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autentica um usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: 2yHxW@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       400:
 *         description: O email e senha são obrigatórios
 */
router.post("/login", UserController.login);
router.post("/logout", verifyToken, UserController.logout);
router.post(
  "/upload/:userId",
  upload.single("file"),
  UserController.uploadPhoto
);
router.use("/uploads", express.static("uploads"));

export default router;
