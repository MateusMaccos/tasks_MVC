import TaskService from "../services/taskService";

class TaskController {
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

  static handleToggleTask = async (id, done, reloadTasks, onError) => {
    try {
      await TaskService.updateTask(id, !done);
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
