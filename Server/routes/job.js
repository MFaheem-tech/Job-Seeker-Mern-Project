import exprss from 'express';
import { createJob, deleteJob, getAllJob, getMyJobs, updateJob } from '../controllers/jobController.js';
import { auth } from '../middlewares/auth.js';


const router=exprss.Router();

router.get('/all-jobs', getAllJob)
router.post('/create-job', auth, createJob)
router.get('/my-jobs', auth, getMyJobs)
router.put('/update-job/:id', auth, updateJob)
router.delete('/delete-job/:id', auth, deleteJob)

export default router;
