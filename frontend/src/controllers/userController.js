import UserService from "../services/userService.js";
class UserController {
  static login = async (email, password, onSuccess, onError) => {
    try {
      await UserService.login(email, password);
      localStorage.setItem("email", email);
      localStorage.setItem("keepLogged", JSON.stringify(true));
      onSuccess();
    } catch (e) {
      onError(e.message || "Erro inesperado");
    }
  };

  static logout = async (onSuccess, onError) => {
    try {
      await UserService.logout();
      localStorage.clear();
      onSuccess();
    } catch (e) {
      onError(e.message || "Erro inesperado");
    }
  };
}

export default UserController;
