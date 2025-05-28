import axios from "axios";
class TaskService {
  static BASE_URL = "http://localhost:3001/tasks";

  // static fetchTasks = async () => {
  //   try {
  //     const res = await fetch(this.BASE_URL, {
  //       credentials: "include",
  //     });
  //     if (!res.ok) {
  //       throw new Error(res.message);
  //     }
  //     return await res.json();
  //   } catch (e) {
  //     throw new Error(e.message || "Erro ao carregar tarefas");
  //   }
  // };
  static fetchTasks = async () => {
    try {
      const res = await axios.get(this.BASE_URL, {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Erro ao carregar tarefas");
    }
  };

  // static addTask = async (title) => {
  //   try {
  //     const res = await fetch(this.BASE_URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ title }),
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw new Error(data.message);
  //     }
  //   } catch (e) {
  //     throw new Error(e.message || "Erro ao adicionar tarefa");
  //   }
  // };
  static addTask = async (title) => {
    try {
      await axios.post(
        this.BASE_URL,
        { title },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      throw new Error(e.response?.data?.message || "Erro ao adicionar tarefa");
    }
  };

  // static updateTask = async (id, status) => {
  //   try {
  //     const res = await fetch(`${this.BASE_URL}/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ status }),
  //       credentials: "include",
  //     });
  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message);
  //     }
  //     return data;
  //   } catch (e) {
  //     throw new Error(e.message || "Erro ao atualizar tarefa");
  //   }
  // };
  static updateTask = async (id, status) => {
    try {
      const res = await axios.put(
        `${this.BASE_URL}/${id}`,
        { status },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Erro ao atualizar tarefa");
    }
  };

  // static deleteTask = async (id) => {
  //   try {
  //     const res = await fetch(`${this.BASE_URL}/${id}`, {
  //       method: "DELETE",
  //       credentials: "include",
  //     });
  //     if (!res.ok) {
  //       throw new Error("Deu erro ao apagar o arquivo");
  //     }
  //   } catch (e) {
  //     throw new Error(e.message || "Erro ao deletar tarefa");
  //   }
  // };
  static deleteTask = async (id) => {
    try {
      await axios.delete(
        `${this.BASE_URL}/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (e) {
      throw new Error(e.response?.data?.message || "Erro ao deletar tarefa");
    }
  };
}

export default TaskService;
