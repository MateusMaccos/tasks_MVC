import { useEffect, useState } from "react";
import UserController from "../controllers/userController";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await UserController.verifyToken(setUser, () => setUser(null));
      } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
