import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/AuthMiddleware";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify-token", authController.verifyToken);
router.get("/me", authMiddleware, authController.getUserProfile);

export default router;