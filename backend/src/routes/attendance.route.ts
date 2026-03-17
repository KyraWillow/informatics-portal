import { Router } from "express";
import {
  index,
  showAttendanceById,
  showAttendanceWithMember,
  showAttendanceWithMeeting,
  store,
} from "../controllers/attendance.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.get("/", index);
router.get("/:id", AuthMiddleware, roleMiddleware("admin"), showAttendanceById);
router.get(
  "/member/:id",
  AuthMiddleware,
  roleMiddleware("admin"),
  showAttendanceWithMember,
);
router.get(
  "/meeting/:id",
  AuthMiddleware,
  roleMiddleware("admin"),
  showAttendanceWithMeeting,
);
router.post("/", AuthMiddleware, store);

export default router;
