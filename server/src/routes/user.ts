import { Router } from "express";
const router = Router()
import { createUser, getUsers } from "../controllers/user";
router.get("/", getUsers)
router.post("/", createUser)

export default router