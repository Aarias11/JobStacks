import express from 'express'
import { 
    getAllApplications,
    createApplication,
    getApplicationById,
    updateApplication,
    deleteApplication
    
 } from '../controllers/applicationsController.js'
 import requireAuth from '../middleware/requireAuth.js';

 const router = express.Router();

 router.use(requireAuth)

 router.get('/', getAllApplications);
 router.post('/', createApplication);
 router.get('/:id', getApplicationById);
 router.put('/:id', updateApplication);
 router.delete('/:id', deleteApplication);



 export default router