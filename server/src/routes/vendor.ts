import { Router } from "express";
const router = Router();
import {
  createVendor,
  getVendorByEmail,
  getVendorById,
  getVendorByToken,
  getVendors,
  login,
  updateVendor,
} from "../controllers/vendor";
import { verifyToken } from "../middleware/verifyToken";
router.get("/", getVendors);
router.post("/", createVendor);
router.post("/login", login);
router.put("/", verifyToken, updateVendor);
router.get("/getVendorByEmail", getVendorByEmail);
router.get("/getVendorById", getVendorById);
router.get("/getVendorByToken", verifyToken, getVendorByToken);

export default router;
