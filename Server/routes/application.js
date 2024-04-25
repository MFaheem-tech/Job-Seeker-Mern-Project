import exprss from 'express';
import { deleteApplicationbyJobSeeker, employeerGetAllApplications, jobSeekerGetAllApplications, sendApplication } from '../controllers/applicationController.js';
import { auth } from '../middlewares/auth.js';
const router=exprss.Router();

router.get('/employer-application', auth, employeerGetAllApplications)
router.get('/jobseeker-applications', auth, jobSeekerGetAllApplications)
router.get('/remove-application', auth, deleteApplicationbyJobSeeker)
router.post('/send-application', auth, sendApplication)

export default router;
