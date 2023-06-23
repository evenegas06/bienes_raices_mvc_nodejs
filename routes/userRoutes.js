import express from 'express';
import { loginForm, registerForm, forgotPasswordForm } from '../controllers/userController.js';

const router = express.Router();

router.get('/iniciar-sesion', loginForm);
router.get('/registro', registerForm);
router.get('/olvide-contrasena', forgotPasswordForm);

export default router;