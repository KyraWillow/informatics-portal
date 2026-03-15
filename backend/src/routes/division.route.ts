import { Router } from "express";
import {
  index,
  showWithMembers,
  store,
  update,
  destroy,
} from "../controllers/division.controller.js";

const route = Router();

route.get("/", index);
route.get("/:id", showWithMembers);
route.post("/:id", store);
route.put("/:id", update);
route.delete("/:id", destroy);

export default route;
