class UserService {
  static BASE_URL = "http://localhost:3001/users";

  static signUp = async (name, email, password) => {
    try {
      const res = await fetch(this.BASE_URL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (e) {
      throw new Error(e.message || "Erro ao criar usuário");
    }
  };

  static login = async (email, password) => {
    try {
      const res = await fetch(`${this.BASE_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
    } catch (e) {
      throw new Error(e.message || "Erro ao fazer login do usuário");
    }
  };

  static exists = async (email) => {
    try {
      const res = await fetch(
        `${this.BASE_URL}/exists?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) {
        throw new Error(res.message);
      }
      return await res.json();
    } catch (e) {
      throw new Error(e.message || "Erro ao carregar usuário");
    }
  };

  static logout = async () => {
    try {
      const res = await fetch(`${this.BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(res.message);
      }
    } catch (e) {
      throw new Error(e.message || "Erro ao fazer logout do usuário");
    }
  };
}

export default UserService;
