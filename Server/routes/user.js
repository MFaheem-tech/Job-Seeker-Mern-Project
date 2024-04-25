import exprss from 'express';
import { getUser, login, logout, register } from '../controllers/userController.js'
import { auth } from '../middlewares/auth.js';

const router=exprss.Router();

router.post('/register', register)
router.post('/login', login)
router.get('/logout', auth, logout)
router.get('/profile', auth, getUser)


export default router;
