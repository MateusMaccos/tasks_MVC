import prisma from "../prismaClient.js";

class TaskModel {
  async getAll() {
    return await prisma.task.findMany({ orderBy: { id: "asc" } });
  }

  async create(title) {
    return await prisma.task.create({
      data: {
        title,
        done: false,
      },
    });
  }
  async update(id, done) {
    return await prisma.task.update({
      where: { id: parseInt(id) },
      data: { done },
    });
  }
  async delete(id) {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
  }
}

export default new TaskModel();
