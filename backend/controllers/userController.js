import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
function generateToken(userId) {
  return jsonwebtoken.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
}
class userController {
  async getAll(req, res) {
    const users = await UserModel.getAll();
    res.json(users);
  }

  async delete(req, res) {
    await UserModel.delete(req.params.id);
    res.sendStatus(204);
  }

  async create(req, res) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ message: "O nome, email e senha são obrigatórios" });
    }
    if (await UserModel.exists(email))
      return res.status(400).send({ message: "Email ja cadastrado" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create(name, email, hashedPassword);
    const id = user.id;
    const token = generateToken(id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 3600000,
    });

    res.status(201).json({
      message: "Cadastro bem-sucedido",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "O email e senha são obrigatórios" });
    }
    console.log(email, password);
    const user = await UserModel.exists(email);
    if (!user)
      return res.status(400).send({ message: "Email ou senha incorretos" });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).send({ message: "Email ou senha incorretos" });
    }
    const id = user.id;
    const token = generateToken(id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 3600000,
    });

    res.json({
      message: "Login bem-sucedido",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
  async logout(req, res) {
    res.clearCookie("token", {
      httpOnly: true,
    });
    res.status(200).json({ message: "Logout bem-sucedido" });
  }

  async testAuth(req, res) {
    res.status(200).json({ message: "Autenticação bem-sucedida" });
  }

  async checkAuth(req, res) {
    try {
      const user = await UserModel.exists(req.userId);
      if (!user)
        return res
          .status(404)
          .json({ message: `Usuário nao encontrado: ${email}` });
      return res.status(200).json({
        isAuthenticated: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Erro ao verificar autenticação" });
    }
  }

  async getOne(req, res) {
    const id = req.userId;
    const user = await UserModel.findById(id);
    if (!user)
      return res.status(404).json({ message: `Usuário nao encontrado: ${id}` });
    return res.status(200).json(user);
  }
}

export default new userController();
