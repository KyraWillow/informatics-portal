import { Router } from "express";
import {
  RegisterController,
  LoginController,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);

export default router;
