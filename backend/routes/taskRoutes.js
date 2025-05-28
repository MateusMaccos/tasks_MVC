import express from "express";
import TaskController from "../controllers/taskController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas
 *     tags:
 *              - Tarefas
 * responses:
 *       200:
 *         description: Lista de tarefas retornada com sucesso
 *       401:
 *         description: Unauthorized
 */
router.get("/", verifyToken, TaskController.getAll);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Fazer compras
 *     tags:
 *      - Tarefas
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: O título é obrigatorio ou o usuário não foi informado
 */
router.post("/", verifyToken, TaskController.create);

/**
 * @swagger
 * /tasks:
 *   put:
 *     summary: Atualiza tarefa
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                  - PENDING
 *                  - PROGRESS
 *                  - DONE
 *                 example: PENDING
 *     tags:
 *      - Tarefas
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Tarefa não encontrada
 *
 */
router.put("/:id", verifyToken, TaskController.update);

/**
 * @swagger
 * /tasks:
 *   delete:
 *     summary: Deletar tarefa
 *     tags:
 *      - Tarefas
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", TaskController.delete);

export default router;
