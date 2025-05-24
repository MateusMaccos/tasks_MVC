import UserService from "../services/userService.js";
class UserController {
  static login = async (email, password, onSuccess, onError) => {
    try {
      await UserService.login(email, password);
      localStorage.setItem("keepLogged", JSON.stringify(true));
      onSuccess();
    } catch (e) {
      onError(e.message || "Erro inesperado");
    }
  };

  static signUp = async (name, email, password, onSuccess, onError) => {
    try {
      await UserService.signUp(name, email, password);
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

  static verifyToken = async (onSuccess, onError) => {
    try {
      const userLogged = await UserService.verifyToken();
      onSuccess(userLogged);
    } catch (e) {
      console.log(e);
      localStorage.clear();
      onError();
    }
  };

  static getPhotoUrl = (imagePath, onError) => {
    try {
      const photoUrl = UserService.getPhotoUrl(imagePath);
      console.log(photoUrl);
      return photoUrl;
    } catch (e) {
      onError(`Erro inesperado ao carregar foto: ${e}`);
    }
  };
}

export default UserController;
