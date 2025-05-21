import TaskService from "../services/taskService";

class TaskController {
  static all_status = ["PENDING", "PROGRESS", "DONE"];

  static Status = {
    PENDING: "PENDING",
    PROGRESS: "PROGRESS",
    DONE: "DONE",
  };

  static status_translation = {
    PENDING: "Pendente",
    PROGRESS: "Em andamento",
    DONE: "Concluído",
  };

  static status_color = {
    PENDING: "text-red-500",
    PROGRESS: "text-orange-500",
    DONE: "text-green-500",
  };

  static statusTranslate(status) {
    return this.status_translation[status];
  }

  static loadTasks = async (setTasks, onError) => {
    try {
      const tasks = await TaskService.fetchTasks();
      setTasks(tasks);
    } catch (e) {
      if (onError)
        onError(
          "Falha ao carregar tarefas - " + e.message || "Erro inesperado"
        );
    }
  };

  static handleCreateTask = async (title, onSuccess, onError) => {
    try {
      await TaskService.addTask(title);
      onSuccess();
    } catch (e) {
      if (onError)
        onError("Falha ao criar tarefa - " + e.message || "Erro inesperado");
    }
  };

  static handleAdvanceTask = async (id, status, reloadTasks, onError) => {
    const index = this.all_status.indexOf(status);
    const nextStatus = this.all_status[index + 1];
    if (nextStatus) {
      await this.handleUpdateTask(id, nextStatus, reloadTasks, onError);
    }
  };
  static handleRegressTask = async (id, status, reloadTasks, onError) => {
    const index = this.all_status.indexOf(status);
    const prevStatus = this.all_status[index - 1];
    if (prevStatus) {
      await this.handleUpdateTask(id, prevStatus, reloadTasks, onError);
    }
  };

  static handleUpdateTask = async (id, status, reloadTasks, onError) => {
    try {
      await TaskService.updateTask(id, status);
      console.log("passou aqui");
      reloadTasks();
    } catch (e) {
      if (onError)
        onError(
          "Falha ao alterar estado da tarefa - " + e.message ||
            "Erro inesperado"
        );
    }
  };

  static handleDeleteTask = async (id, reloadTasks, onError) => {
    try {
      await TaskService.deleteTask(id);
      reloadTasks();
    } catch (e) {
      if (onError)
        onError("Falha ao deletar tarefa - " + e.message || "Erro inesperado");
    }
  };
}

export default TaskController;
