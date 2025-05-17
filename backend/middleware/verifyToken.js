import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie("token");
      if (err.name === "JsonWebTokenError") {
        return res.status(403).json({ message: "Token inválido" });
      }
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token expirado" });
      }
      return res.status(403).json({ message: "Falha na autenticação" });
    }

    req.userId = decoded.id;
    next();
  });
};

export default verifyToken;
