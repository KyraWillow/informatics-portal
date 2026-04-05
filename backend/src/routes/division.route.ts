import { Router } from "express";
import {
  index,
  showWithMembers,
  showWithMembersPublic,
  store,
  update,
  destroy,
} from "../controllers/division.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const route = Router();

route.get("/", index);
route.get("/public/:id", showWithMembersPublic); // Public endpoint without auth
route.get("/:id", AuthMiddleware, roleMiddleware("admin"), showWithMembers);
route.post("/", AuthMiddleware, roleMiddleware("admin"), store);
route.put("/:id", AuthMiddleware, roleMiddleware("admin"), update);
route.delete("/:id", AuthMiddleware, roleMiddleware("admin"), destroy);

export default route;
