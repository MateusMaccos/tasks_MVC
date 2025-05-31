import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserController from "../controllers/userController";
import AuthContext from "../context/AuthContext";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleImage = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    var formData;
    if (image) {
      formData = new FormData();
      formData.append("file", image);
    }
    await UserController.signUp(
      name,
      email,
      password,
      formData,
      (user) => {
        setUser(user);
        navigate("/tasks");
        setName("");
        setEmail("");
        setPassword("");
      },
      (err) => setError(err)
    );
  };
  return (
    <div className="flex flex-col items-center  bg-gray-400 h-screen w-full">
      <div className="mt-80 flex flex-col items-center bg-gray-200 p-10 rounded-lg shadow-md justify-center">
        <form onSubmit={handleSignUp} className="flex flex-col w-full">
          <h1 className="text-5xl font-bold">Faça seu cadastro</h1>
          <div className="mt-5 ">
            <input
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black cursor-pointer"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
          <input
            className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
          />
          <input
            className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 hover:cursor-pointer"
            type="submit"
          >
            Cadastrar
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <p className="mt-5 items-center">
          Já tem uma conta?{" "}
          <a href="/" className="text-blue-500">
            Clique aqui
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
