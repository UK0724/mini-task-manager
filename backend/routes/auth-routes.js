import { Router } from "express";
import { loginUser, registerUser, getMe } from "../controllers/auth-controller.js";
import authenticateMiddleware from "../middlewares/authenticate-middleware.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getme", authenticateMiddleware, getMe);

export default router;
