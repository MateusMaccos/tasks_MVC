import prisma from "../prismaClient.js";

class TaskModel {
  async getAll(userId) {
    return await prisma.task.findMany({
      orderBy: { id: "asc" },
      where: { user: { id: parseInt(userId) } },
    });
  }

  async create(title, userId) {
    return await prisma.task.create({
      data: {
        title,
        done: false,
        user: { connect: { id: parseInt(userId) } },
      },
    });
  }
  async update(id, done, userId) {
    return await prisma.task.update({
      where: { id: parseInt(id), user: { id: parseInt(userId) } },
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
