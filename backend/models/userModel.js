import prisma from "../prismaClient.js";

class UserModel {
  async getAll() {
    return await prisma.user.findMany({ orderBy: { id: "asc" } });
  }

  async create(name, email, password) {
    return await prisma.user.create({ data: { name, email, password } });
  }

  async update(id, data) {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: data,
    });
  }

  async delete(id) {
    return await prisma.user.delete({ where: { id: parseInt(id) } });
  }

  async exists(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id) {
    return await prisma.user.findUnique({ where: { id: parseInt(id) } });
  }
}

export default new UserModel();
