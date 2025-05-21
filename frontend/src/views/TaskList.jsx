import React, { useEffect, useState } from "react";
import TaskController from "../controllers/taskController";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const reload = () => {
    TaskController.loadTasks(setTasks, onError);
  };

  const onError = (err) => setError(err);

  useEffect(() => {
    reload();
  }, []);

  if (!error) {
    return tasks.length === 0 ? (
      <p className="text-gray-500">Nenhuma tarefa :(</p>
    ) : (
      <ul className="w-full">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center mt-2.5">
            {task.status === TaskController.Status.PENDING ? null : (
              <SlArrowLeft
                onClick={() =>
                  TaskController.handleRegressTask(
                    task.id,
                    task.status,
                    reload,
                    onError
                  )
                }
                style={{ cursor: "pointer", color: "gray" }}
              />
            )}
            <span
              className={
                "mr-5 ml-5 font-bold " +
                TaskController.status_color[task.status]
              }
            >
              {TaskController.statusTranslate(task.status)}
            </span>
            {task.status === TaskController.Status.DONE ? null : (
              <SlArrowRight
                onClick={() =>
                  TaskController.handleAdvanceTask(
                    task.id,
                    task.status,
                    reload,
                    onError
                  )
                }
                style={{ cursor: "pointer", color: "gray" }}
              />
            )}
            <span
              className={
                task.status === TaskController.Status.DONE
                  ? "line-through"
                  : "" + "mr-2.5 ml-2.5"
              }
            >
              {task.title}
            </span>
            <svg
              onClick={() =>
                TaskController.handleDeleteTask(task.id, reload, onError)
              }
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 cursor-pointer ml-auto text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </li>
        ))}
      </ul>
    );
  } else {
    return <p className="text-red-500">{error}</p>;
  }
}

export default TaskList;
