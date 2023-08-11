import { Router } from "express";
import {
  createVendorClient,
  deleteVendorClient,
  getAllVendorClients,
  getVendorClientById,
  getVendorClientsByVendor,
  updateVendorClient,
} from "../controllers/vendorClient";
import { verifyToken } from "../middleware/verifyToken";
const router = Router();

router.get(
  "/get-vendor-clients-by-vendor",
  verifyToken,
  getVendorClientsByVendor
);
router.post("/create/:id", createVendorClient);

// for testing (so far)
router.get("/getAll", getAllVendorClients);
router.get("/getById/:id", getVendorClientById);
router.put("/update/:id", updateVendorClient);
router.delete("/delete/:id", deleteVendorClient);

export default router;
