import { Router } from 'express';

import { loginValidation, registerValidation } from '../../Middleware/validation/auth.validation.js';
import { login, logout, register } from '../../services/auth.services.js';
import { getLogedUser, getUserPostWithComments } from './user.controller.js';
import { verifyToken } from '../../Middleware/verifyToken.middleware.js';

const router = Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', verifyToken, logout);
router.get('/getMe', verifyToken, getLogedUser)
router.get('/:userId/post/:postId', verifyToken, getUserPostWithComments);


export default router;