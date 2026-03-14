import { Router } from "express";
import { index, store, update, destroy } from "../controllers/achievement.controller.js";

const route = Router()

route.get("/", index)
route.post("/", store)
route.put("/:id", update)
route.delete("/:id", destroy)

export default route
