import express from 'express';

import {
    loginForm,
    registerForm,
    forgotPasswordForm,
    register,
    confirmAccount,
    resetPassword,
    verifyToken,
    createNewPassword,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/iniciar-sesion', loginForm);

router.route('/registro')
    .get(registerForm)
    .post(register);

router.get('/confirmar-cuenta/:token', confirmAccount);

router.route('/olvide-contrasena')
    .get(forgotPasswordForm)
    .post(resetPassword);

router.route('/olvide-contrasena/:token')
    .get(verifyToken)
    .post(createNewPassword);

export default router;