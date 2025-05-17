import TaskList from "./views/TaskList";
import TaskForm from "./views/TaskForm";
import { useContext } from "react";
import { AuthContext } from "./context/auth";
import UserController from "./controllers/userController";
import { useState } from "react";

function TaskScreen() {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const handleLogout = () => {
    UserController.logout(
      () => window.location.reload(),
      (err) => setError(err)
    );
  };

  if (error) return <p>{error}</p>;
  return (
    <div className="flex flex-col items-center  bg-gray-400 h-screen">
      <div className="mt-80 flex flex-col bg-gray-200 p-10 rounded-lg shadow-md">
        <h1 className="text-6xl font-bold">
          Criar tarefa para {user ? user.name : "..."}
        </h1>
        <div className="flex flex-col items-end-safe">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 mt-5 rounded hover:cursor-pointer"
          >
            Sair
          </button>
        </div>
        <div className="flex flex-col items-center">
          <TaskForm reload={() => window.location.reload()} />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center bg-gray-200 p-5 rounded-lg shadow-md">
        <h1 className=" font-bold">Lista de tarefas</h1>
        <TaskList />
      </div>
    </div>
  );
}

export default TaskScreen;
