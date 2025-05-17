import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserController from "../controllers/userController";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await UserController.login(
      email,
      password,
      () => {
        setEmail("");
        setPassword("");
        setError("");
        navigate("/tasks");
      },
      (err) => setError(err)
    );
  };
  return (
    <div className="flex flex-col items-center  bg-gray-400 h-screen w-full">
      <div className="mt-80 flex flex-col items-center bg-gray-200 p-10 rounded-lg shadow-md justify-center">
        <form onSubmit={handleLogin} className="flex flex-col w-full">
          <h1 className="text-5xl font-bold">Faça seu login</h1>
          <input
            className="mt-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
            type="submit"
          >
            Logar
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
