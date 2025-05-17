import TaskModel from "../models/taskModel.js";

class TaskController {
  async getAll(req, res) {
    const tasks = await TaskModel.getAll();
    res.json(tasks);
  }

  async create(req, res) {
    const { title } = req.body;
    if (!title)
      return res.status(400).send({ message: "O título é obrigatorio" });
    const task = await TaskModel.create(title);
    res.status(201).json(task);
  }

  async update(req, res) {
    const { done } = req.body;
    const task = await TaskModel.update(req.params.id, done);
    task
      ? res.json(task)
      : res.status(404).json({ message: "Tarefa não encontrada" });
  }
  async delete(req, res) {
    await TaskModel.delete(req.params.id);
    res.sendStatus(204);
  }
}

export default new TaskController();
