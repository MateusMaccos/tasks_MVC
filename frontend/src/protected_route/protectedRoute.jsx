import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLogged = JSON.parse(localStorage.getItem("keepLogged"));
  return isLogged ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
