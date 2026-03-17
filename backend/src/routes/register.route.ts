import { Router } from "express";
import {
  RegisterController,
  LoginController,
} from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.post(
  "/register",
  AuthMiddleware,
  roleMiddleware("admin"),
  RegisterController,
);
router.post("/login", LoginController);

export default router;
