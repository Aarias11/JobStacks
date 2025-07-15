import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { parseJobFromUrl } from '../controllers/aiController.js';

const router = express.Router();

router.post('/parse-job', requireAuth, parseJobFromUrl);

export default router;