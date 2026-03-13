import { Router } from "express";
import { RegisterUserController } from "../controllers/register.controller.js";

const router = Router();

router.post("/", RegisterUserController);

export default router;
