import { Router } from "express";
import {
  index,
  showWithDivision,
  showWithAttendance,
  store,
  update,
  destroy,
} from "../controllers/member.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", index);
router.get(
  "/:id/division",
  AuthMiddleware,
  roleMiddleware("admin"),
  showWithDivision,
);
router.get(
  "/:id/attendance",
  AuthMiddleware,
  roleMiddleware("admin"),
  showWithAttendance,
);
router.post("/", AuthMiddleware, roleMiddleware("admin"), store);
router.put("/:id", AuthMiddleware, roleMiddleware("admin"), update);
router.delete("/:id", AuthMiddleware, roleMiddleware("admin"), destroy);

export default router;
