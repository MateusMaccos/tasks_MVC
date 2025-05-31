import axios from "axios";

class UserService {
  static BASE_URL = "http://localhost:3001/users";

  // static signUp = async (name, email, password) => {
  //   try {
  //     const res = await fetch(this.BASE_URL, {
  //       method: "POST",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, email, password }),
  //     });
  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message);
  //     }
  //   } catch (e) {
  //     throw new Error(e.message || "Erro ao criar usuário");
  //   }
  // };
  static signUp = async (name, email, password, formdata) => {
    try {
      const res = await axios.post(
        this.BASE_URL,
        {
          name,
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (formdata) {
        const resImage = await this.uploadImage(res.data.user.id, formdata);
        res.data.user.imagePath = resImage;
        console.log(resImage);
      }
      console.log(res.data.user);
      return res.data.user;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Erro ao criar usuário");
    }
  };

  static uploadImage = async (userId, formdata) => {
    try {
      const res = await axios.post(
        `${this.BASE_URL}/upload/${userId}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data.imagePath;
    } catch (e) {
      throw new Error(
        e.response?.data?.message || "Erro ao fazer upload da imagem"
      );
    }
  };

  // static login = async (email, password) => {
  //   try {
  //     const res = await fetch(`${this.BASE_URL}/login`, {
  //       method: "POST",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       throw new Error(data.message);
  //     }
  //   } catch (e) {
  //     throw new Error(e.message || "Erro ao fazer login do usuário");
  //   }
  // };
  static login = async (email, password) => {
    try {
      const res = await axios.post(
        `${this.BASE_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.user;
    } catch (e) {
      throw new Error(
        e.response?.data?.message || "Erro ao fazer login do usuário"
      );
    }
  };

  // static exists = async (email) => {
  //   try {
  //     const res = await fetch(
  //       `${this.BASE_URL}/exists?email=${encodeURIComponent(email)}`
  //     );
  //     if (!res.ok) {
  //       throw new Error(res.message);
  //     }
  //     return await res.json();
  //   } catch (e) {
  //     throw new Error(e.message || "Erro ao carregar usuário");
  //   }
  // };
  static exists = async (email) => {
    try {
      const res = await axios.get(
        `${this.BASE_URL}/exists?email=${encodeURIComponent(email)}`
      );
      return res.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Erro ao carregar usuário");
    }
  };

  // static logout = async () => {
  //   try {
  //     const res = await fetch(`${this.BASE_URL}/logout`, {
  //       method: "POST",
  //       credentials: "include",
  //     });
  //     if (!res.ok) {
  //       throw new Error(res.message);
  //     }
  //   } catch (e) {
  //     throw new Error(e.message || "Erro ao fazer logout do usuário");
  //   }
  // };
  static logout = async () => {
    try {
      const res = await axios.post(
        `${this.BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (e) {
      throw new Error(
        e.response?.data?.message || "Erro ao fazer logout do usuário"
      );
    }
  };
  static verifyToken = async () => {
    try {
      const res = await axios.get(`${this.BASE_URL}/user`, {
        withCredentials: true,
      });
      return res.data;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Erro ao verificar o token");
    }
  };
  static getPhotoUrl = (imagePath) => {
    try {
      const url = `${this.BASE_URL}${imagePath}`;
      return url;
    } catch (e) {
      throw new Error(e.response?.data?.message || "Erro ao carregar foto");
    }
  };
}

export default UserService;
