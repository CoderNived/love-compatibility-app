import express from 'express';
import {
  calculateLove,
  getAllLoveEntries,
  getLoveStats,
  deleteLoveEntry
} from '../controllers/loveController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

// Public route - anyone can calculate love
router.post('/', calculateLove);

// Protected admin routes - need password
router.get('/', adminAuth, getAllLoveEntries);
router.get('/stats', adminAuth, getLoveStats);
router.delete('/:id', adminAuth, deleteLoveEntry);

export default router;
