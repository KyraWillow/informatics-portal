import { Router } from "express";
import {
  index,
  showAttendanceById,
  showAttendanceWithMember,
  showAttendanceWithMeeting,
  store,
} from "../controllers/attendance.controller.js";

const router = Router();

router.get("/", index);
router.get("/:id", showAttendanceById);
router.get("/member/:id", showAttendanceWithMember);
router.get("/meeting/:id", showAttendanceWithMeeting);
router.post("/", store);

export default router;
