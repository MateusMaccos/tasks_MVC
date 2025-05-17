import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TaskScreen from "./TaskScreen.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./views/Login.jsx";
import { AuthProvider } from "./context/auth.jsx";

const isLogged = JSON.parse(localStorage.getItem("keepLogged"));

const router = createBrowserRouter([
  {
    path: "/tasks",
    element: isLogged ? <TaskScreen /> : <Navigate to="/" />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
