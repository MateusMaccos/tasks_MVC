class TaskService {
  static BASE_URL = "http://localhost:3001/tasks";

  static fetchTasks = async () => {
    try {
      const res = await fetch(this.BASE_URL);
      if (!res.ok) {
        throw new Error(res.message);
      }
      return await res.json();
    } catch (e) {
      throw new Error(e.message || "Erro ao carregar tarefas");
    }
  };

  static addTask = async (title) => {
    try {
      const res = await fetch(this.BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (e) {
      throw new Error(e.message || "Erro ao adicionar tarefa");
    }
  };

  static updateTask = async (id, done) => {
    try {
      const res = await fetch(`${this.BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (e) {
      throw new Error(e.message || "Erro ao atualizar tarefa");
    }
  };

  static deleteTask = async (id) => {
    try {
      const res = await fetch(`${this.BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Deu erro ao apagar o arquivo");
      }
    } catch (e) {
      throw new Error(e.message || "Erro ao deletar tarefa");
    }
  };
}

export default TaskService;
