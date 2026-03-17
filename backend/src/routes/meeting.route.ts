import { Router } from "express";
import {
  index,
  showMeetingWithAttendance,
  store,
  update,
  destroy,
} from "../controllers/meeting.contoller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const route = Router();

route.get("/", index);
route.get(
  "/:id",
  AuthMiddleware,
  roleMiddleware("admin"),
  showMeetingWithAttendance,
);
route.post("/", AuthMiddleware, roleMiddleware("admin"), store);
route.put("/:id", AuthMiddleware, roleMiddleware("admin"), update);
route.delete("/:id", AuthMiddleware, roleMiddleware("admin"), destroy);

export default route;
