import { Router } from "express";
import {
  index,
  store,
  update,
  destroy,
} from "../controllers/blog.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", index);
router.post("/", AuthMiddleware, roleMiddleware("admin"), store);
router.put("/:id", AuthMiddleware, roleMiddleware("admin"), update);
router.delete("/:id", AuthMiddleware, roleMiddleware("admin"), destroy);

export default router;
