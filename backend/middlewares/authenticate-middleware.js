import { verifyToken } from "../services/auth-service.js";

const authenticateMiddleware = (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const [scheme, token] = auth.split(" ");
    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const decoded = verifyToken(token);
    req.user = { id: decoded.id };
    return next();
  } catch (err) {
    if (err?.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", success: false });
    }
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};

export default authenticateMiddleware;
