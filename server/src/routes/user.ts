import { Router } from "express";
const router = Router();
import {
  createUser,
  getUserByEmail,
  getUserById,
  getUsers,
  login,
} from "../controllers/user";
router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", login);
router.get("/getUserByEmail", getUserByEmail);
router.get("/getUserById", getUserById);

export default router;
