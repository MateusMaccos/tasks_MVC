import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TaskScreen from "./TaskScreen.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./views/Login.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import SignUp from "./views/SignUp.jsx";
import ProtectedRoute from "./protected_route/protectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/tasks",
    element: (
      <ProtectedRoute>
        <TaskScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
