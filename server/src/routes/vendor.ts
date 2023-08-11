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

router.put("/", verifyToken, updateVendor);
router.get("/getVendorByToken", verifyToken, getVendorByToken);

// auth not required for this
router.post("/", createVendor);
router.post("/login", login);

// for testing
router.get("/", getVendors);
router.get("/getVendorByEmail", getVendorByEmail);
router.get("/getVendorById", getVendorById);

export default router;
