import { Router } from "express";
import {
  index,
  showWithDivision,
  showWithAttendance,
  store,
  update,
  destroy,
} from "../controllers/member.controller.js";

const router = Router();

router.get("/", index);
router.get("/:id/division", showWithDivision);
router.get("/:id/attendance", showWithAttendance);
router.post("/", store);
router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
