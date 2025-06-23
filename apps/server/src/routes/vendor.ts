import { Router } from 'express';
const router = Router();
import {
  getVendorByEmail,
  getVendorById,
  getVendorByToken,
  getVendors,
  updateVendor,
} from '../controllers/vendor';
import { verifyToken } from '../middleware/verifyToken';

// TODO: Remove all vendor routes eventually...

router.put('/', verifyToken, updateVendor);
router.get('/getVendorByToken', verifyToken, getVendorByToken);

// for testing
router.get('/', getVendors);
router.get('/getVendorByEmail', getVendorByEmail);
router.get('/getVendorById', getVendorById);

export default router;
