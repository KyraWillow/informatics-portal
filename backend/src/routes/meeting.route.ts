import { Router } from "express";
import {
  index,
  showMeetingWithAttendance,
  store,
  update,
  destroy,
} from "../controllers/meeting.contoller.js";

const route = Router();

route.get("/", index);
route.get("/:id", showMeetingWithAttendance);
route.post("/", store);
route.put("/:id", update);
route.delete("/:id", destroy);

export default route;
