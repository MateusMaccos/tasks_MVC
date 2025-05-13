import React from "react";
import TaskForm from "./views/taskForm";
import TaskList from "./views/taskList";

function App() {
  return (
    <div className="flex flex-col items-center  bg-gray-400 h-screen">
      <div className="mt-80 flex flex-col items-center bg-gray-200 p-10 rounded-lg shadow-md">
        <h1 className="text-6xl font-bold">Criar tarefa</h1>
        <TaskForm reload={() => window.location.reload()} />
      </div>
      <div className="mt-8 flex flex-col items-center bg-gray-200 p-5 rounded-lg shadow-md">
        <h1 className=" font-bold">Lista de tarefas</h1>
        <TaskList />
      </div>
    </div>
  );
}

export default App;
