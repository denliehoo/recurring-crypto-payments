import { Router } from "express";
const router = Router();
import {
  createVendor,
  getVendorByEmail,
  getVendorById,
  getVendors,
  login,
  updateVendor,
} from "../controllers/vendor";
router.get("/", getVendors);
router.post("/", createVendor);
router.post("/login", login);
router.put("/", updateVendor);
router.get("/getVendorByEmail", getVendorByEmail);
router.get("/getVendorById", getVendorById);

export default router;
