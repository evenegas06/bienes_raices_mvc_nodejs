import express from 'express';

import {
    loginForm,
    registerForm,
    forgotPasswordForm,
    register
} from '../controllers/userController.js';

const router = express.Router();

router.get('/iniciar-sesion', loginForm);

router.get('/registro', registerForm);
router.post('/registro', register);

router.get('/olvide-contrasena', forgotPasswordForm);

export default router;