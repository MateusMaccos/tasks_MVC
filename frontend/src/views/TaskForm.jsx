import React, { useState } from "react";
import TaskController from "../controllers/taskController";

function TaskForm({ reload }) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await TaskController.handleCreateTask(
      title,
      () => {
        setTitle("");
        reload();
      },
      (err) => setError(err)
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="mt-15 mr-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite uma tarefa"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Adicionar
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default TaskForm;
