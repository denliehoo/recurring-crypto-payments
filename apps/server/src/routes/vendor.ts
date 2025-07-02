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

router.put('/', verifyToken, updateVendor);
router.get('/', verifyToken, getVendorByToken);

// for testing
router.get('/getAllVendors', getVendors);
router.get('/getVendorByEmail', getVendorByEmail);
router.get('/getVendorById', getVendorById);

export default router;
