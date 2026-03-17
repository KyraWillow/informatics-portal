import { Router } from "express";
import {
  index,
  store,
  update,
  destroy,
} from "../controllers/competition.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const route = Router();

route.get("/", index);
route.post("/", AuthMiddleware, roleMiddleware("admin"), store);
route.put("/:id", AuthMiddleware, roleMiddleware("admin"), update);
route.delete("/:id", AuthMiddleware, roleMiddleware("admin"), destroy);

export default route;
