import request from "supertest";
import app from "../app.js";
import path from "path";

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const user = {
  name: "John Doe",
  email: "2yHxW@example.com",
  password: "password123",
};

let userId;

describe("Testes de cadastro de usuários", () => {
  it("deve cadastrar um usuário", async () => {
    const response = await request(app).post("/users").send(user);
    userId = response.body.user.id;
    expect(response.statusCode).toBe(201);
    expect(response.body.user.email).toBe(user.email);
  });

  it("deve falhar ao cadastrar um usuário com email duplicado", async () => {
    await request(app).post("/users").send(user);
    const response = await request(app).post("/users").send(user);

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toBe("Email ja cadastrado");
  });
});

describe("Testes de autenticação de usuários", () => {
  it("deve autenticar um usuário", async () => {
    const response = await request(app).post("/users/login").send(user);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe(user.email);
  });
});

describe("Testes de autenticar usuário", () => {
  let agent;
  let cookie;
  let taskId;

  beforeAll(async () => {
    agent = request.agent(app);
    const loginResponse = await agent.post("/users/login").send(user);
    cookie = loginResponse.headers["set-cookie"];
    expect(cookie).toBeDefined();
  });
  const task = {
    title: "Tarefa 1",
    status: "PENDING",
  };

  it("deve criar uma tarefa", async () => {
    const response = await agent
      .post("/tasks")
      .send({
        title: task.title,
      })
      .set("Cookie", cookie);

    taskId = response.body.id;
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(task.title);
  });

  it("deve listar as tarefas", async () => {
    const response = await agent.get("/tasks").set("Cookie", cookie);

    expect(response.statusCode).toBe(200);
  });

  it("deve atualizar uma tarefa", async () => {
    const taskModificada = {
      title: "Tarefa 1 Modificada",
      status: "DONE",
    };
    const response = await agent
      .put(`/tasks/${taskId}`)
      .send({ status: taskModificada.status })
      .set("Cookie", cookie);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(taskModificada.status);
  });

  it("deve deletar uma tarefa", async () => {
    const response = await agent
      .delete(`/tasks/${taskId}`)
      .set("Cookie", cookie);

    expect(response.statusCode).toBe(204);
  });

  it("deve deslogar um usuário", async () => {
    const response = await agent.post("/users/logout").set("Cookie", cookie);

    expect(response.statusCode).toBe(200);
  });

  describe("Teste de upload de imagem", () => {
    it("deve fazer upload de uma imagem para o usuário", async () => {
      const filePath = path.join(__dirname, "fixtures", "imagem.jpg");

      const response = await request(app)
        .post(`/users/upload/${userId}`)
        .attach("file", filePath);
      console.log(response.body);
      expect(response.statusCode).toBe(200);
    });
  });

  it("deve remover um usuário", async () => {
    const response = await agent
      .delete(`/users/${userId}`)
      .set("Cookie", cookie);

    expect(response.statusCode).toBe(204);
  });
});
