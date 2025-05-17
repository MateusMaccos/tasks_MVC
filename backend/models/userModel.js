import prisma from "../prismaClient.js";

class UserModel {
  async getAll() {
    return await prisma.user.findMany({ orderBy: { id: "asc" } });
  }

  async create(name, email, password) {
    return await prisma.user.create({ data: { name, email, password } });
  }

  async delete(id) {
    await prisma.user.delete({ where: { id: parseInt(id) } });
  }

  async exists(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async findById(id) {
    return await prisma.user.findUnique({ where: { id: parseInt(id) } });
  }
}

export default new UserModel();
