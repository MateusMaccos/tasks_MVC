import UserController from "../controllers/UserController";
import UserService from "../services/userService";
import { expect, test, describe, jest, afterEach } from "@jest/globals";

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => (store[key] = value),
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

jest.mock("../services/userService");

describe("UserController", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("login deve chamar onSuccess com usuário", async () => {
    const mockUser = { id: 1, name: "Mateus" };
    UserService.login.mockResolvedValue(mockUser);

    const onSuccess = jest.fn();
    const onError = jest.fn();

    await UserController.login(
      "mateus@email.com",
      "123456",
      onSuccess,
      onError
    );

    expect(UserService.login).toHaveBeenCalledWith(
      "mateus@email.com",
      "123456"
    );
    expect(localStorage.getItem("keepLogged")).toBe("true");
    expect(onSuccess).toHaveBeenCalledWith(mockUser);
    expect(onError).not.toHaveBeenCalled();
  });

  test("signUp com erro deve chamar onError", async () => {
    UserService.signUp.mockRejectedValue(new Error("Falha no cadastro"));

    const onSuccess = jest.fn();
    const onError = jest.fn();

    await UserController.signUp(
      "João",
      "joao@mail.com",
      "senha",
      null,
      onSuccess,
      onError
    );

    expect(onError).toHaveBeenCalledWith("Falha no cadastro");
    expect(onSuccess).not.toHaveBeenCalled();
  });

  test("logout limpa localStorage e chama onSuccess", async () => {
    UserService.logout.mockResolvedValue();

    const onSuccess = jest.fn();
    const onError = jest.fn();

    localStorage.setItem("keepLogged", "true");
    await UserController.logout(onSuccess, onError);

    expect(localStorage.getItem("keepLogged")).toBe(undefined);
    expect(onSuccess).toHaveBeenCalled();
  });

  test("verifyToken com erro deve limpar localStorage e chamar onError", async () => {
    UserService.verifyToken.mockRejectedValue(new Error("Token inválido"));

    const onSuccess = jest.fn();
    const onError = jest.fn();

    await UserController.verifyToken(onSuccess, onError);

    expect(localStorage.getItem("keepLogged")).toBe(undefined);
    expect(onError).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  test("getPhotoUrl retorna URL corretamente", () => {
    UserService.getPhotoUrl.mockReturnValue("https://site.com/foto.jpg");
    const result = UserController.getPhotoUrl("foto.jpg", jest.fn());

    expect(result).toBe("https://site.com/foto.jpg");
  });
});
