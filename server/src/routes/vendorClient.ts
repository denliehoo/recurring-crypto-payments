import { Router } from "express";
import {
  createVendorClient,
  deleteVendorClient,
  getAllVendorClients,
  getVendorClientById,
  getVendorClientsByVendor,
  updateVendorClient,
} from "../controllers/vendorClient";
const router = Router();

router.get("/getByVendorId/:id", getVendorClientsByVendor);
router.get("/getAll", getAllVendorClients);
router.get("/getById/:id", getVendorClientById);
router.post("/create", createVendorClient);
router.put("/update/:id", updateVendorClient);
router.delete("/delete/:id", deleteVendorClient);

export default router;
