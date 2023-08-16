import express from 'express';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import User from '../models/User.js';
import { generateID } from '../helpers/helpers.js';
import { registerEmail, resetPasswordEmail } from '../utils/emails.js';

/**
 * Show login form.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const loginForm = (request, response) => {
    response.render('auth/login', {
        title: 'Iniciar sesión'
    });
};

/**
 * Show register form.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const registerForm = (request, response) => {
    response.render('auth/register', {
        title: 'Crear cuenta',
        csrfToken: request.csrfToken(),
    });
};

/**
 * Save new user on database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const register = async (request, response) => {
    const { name, email, password } = request.body;

    /* ----- Validation rules ----- */
    await check('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio.')
        .run(request);

    await check('email')
        .isEmail()
        .withMessage('Formato de correo electrónico incorrecto.')
        .run(request);

    await check('password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe ser de al menos 6 caracteres.')
        .run(request);

    await check('repeat_password')
        .equals(password)
        .withMessage('Las contraseñas no coinciden.')
        .run(request);

    /* ----- Input errors ----- */
    const validation = validationResult(request);
    if (!validation.isEmpty()) {
        return response.render('auth/register', {
            title: 'Crear cuenta',
            errors: validation.array(),
            user: { name, email },
            csrfToken: request.csrfToken(),
        });
    }

    /* ----- Check if email exists on database ----- */
    const user_exists = await User.findOne({ where: { email } });
    if (user_exists) {
        return response.render('auth/register', {
            title: 'Crear cuenta',
            errors: [{ msg: 'Este correo ya se ha registrado, intenta con otro.' }],
            user: { name },
            csrfToken: request.csrfToken(),
        });
    }

    /* ----- Save user on database ----- */
    const user = await User.create({
        name,
        email,
        password,
        token: generateID()
    });

    /* ----- Send confirmation email ----- */
    registerEmail({
        name: user.name,
        email: user.email,
        token: user.token
    });

    /* ----- Confirm view ----- */
    response.render('templates/message', {
        title: 'Confirmación de correo electrónico',
        message: 'Se ha enviado un email de confirmación al correo electrónico registrado.'
    });
};

/**
 * Confirm account by token.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const confirmAccount = async (request, response) => {
    const user = await User.findOne({
        where: {
            token: request.params.token,
        }
    });

    if (!user) {
        return response.render('auth/confirm-account', {
            title: 'Error al confirmar cuenta. ❌',
            message: 'Hubo un error al confirmar tu cuenta, por favor intenta de nuevo.',
            error: true,
        });
    }

    /* ----- Delete token and save ----- */
    user.token = null;
    user.confirm = true;

    await user.save();

    response.render('auth/confirm-account', {
        title: 'Cuenta confirmada',
        message: 'La cuenta se confirmó correctamente.',
        error: false,
    });
};

/**
 * Show forgot password form.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const forgotPasswordForm = (request, response) => {
    response.render('auth/forgot-password', {
        title: 'Recupera tu acceso. 😎',
        csrfToken: request.csrfToken(),
    });
};

/**
 * Reset password.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const resetPassword = async (request, response) => {
    /* ----- Validation rules ----- */
    await check('email')
        .isEmail()
        .withMessage('Formato de correo electrónico incorrecto.')
        .run(request);

    /* ----- Input errors ----- */
    const validation = validationResult(request);
    if (!validation.isEmpty()) {
        return response.render('auth/forgot-password', {
            title: 'Recupera tu acceso. 😎',
            csrfToken: request.csrfToken(),
            errors: validation.array(),
        });
    }

    /* ----- Find user ----- */
    const user = await User.findOne({
        where: {
            email: request.body.email
        }
    });

    if (!user) {
        return response.render('auth/forgot-password', {
            title: 'Recupera tu acceso. 😎',
            csrfToken: request.csrfToken(),
            errors: [{ msg: 'El email ingresado no existe en nuestros registros.' }]
        });
    }

    /* ----- Generate new token and send email ----- */
    user.token = generateID();
    await user.save();

    resetPasswordEmail(user);

    response.render('templates/message', {
        title: 'Restablece tu contraseña.',
        message: 'Se ha enviado un email con las instrucciones para restablecer tu contraseña.'
    });
};

/**
 * Verify token and show reset password form.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const verifyToken = async (request, response) => {
    const token = request.params.token;

    /* ----- Find user ----- */
    const user = await User.findOne({
        where: {
            token: token
        }
    });

    if (!user) {
        return response.render('auth/confirm-account', {
            title: 'Restablece tu contraseña',
            message: 'Hubo un error al validar tu información, intenta de nuevo.',
            error: true,
        });
    }

    response.render('auth/reset-password', {
        title: 'Restablecer contraseña',
        csrfToken: request.csrfToken(),
    });
};

/**
 * Save new password on database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const createNewPassword = async (request, response) => {
    /* ----- Validation rules ----- */
    await check('new_password')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe ser de al menos 6 caracteres.')
        .run(request);

    const validation = validationResult(request);

    if (!validation.isEmpty()) {
        return response.render('auth/reset-password', {
            title: 'Restablece tu contraseña.',
            csrfToken: request.csrfToken(),
            errors: validation.array(),
        });
    }

    /* ----- Identify user ----- */
    const user = await User.findOne({
        where: {
            token: request.params.token,
        }
    });

    /* ----- Save password ande delete token ----- */
    const salt = await bcrypt.genSalt(10);
    
    user.password = await bcrypt.hash(request.body.new_password, salt);
    user.token = null;

    await user.save();

    response.render('auth/confirm-account', {
        title: 'Contraseña restablecida',
        message: 'La contraseña se guardó correctamente. 😎',
        error: false
    });
}; 