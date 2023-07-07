import express from 'express';

import {
    loginForm,
    registerForm,
    forgotPasswordForm,
    register,
    confirmAccount
} from '../controllers/userController.js';

const router = express.Router();

router.get('/iniciar-sesion', loginForm);

router.get('/registro', registerForm);
router.post('/registro', register);
router.get('/confirmar-cuenta/:token', confirmAccount);

router.get('/olvide-contrasena', forgotPasswordForm);

export default router;