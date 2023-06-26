import express from 'express';
import { check, validationResult } from 'express-validator';

import User from '../models/User.js';

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
        title: 'Crear cuenta'
    });
};

/**
 * Save new user on database.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const register = async (request, response) => {
    /* Validation rules */
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
        .equals('password')
        .withMessage('Las contraseñas no coinciden.')
        .run(request);

    const validation = validationResult(request);

    if (!validation.isEmpty()) {
        console.log(validation.array());
        /* --- Errors --- */
        return response.render('auth/register', {
            title: 'Crear cuenta',
            errors: validation.array(),
            user: {
                name: request.body.name,
                email: request.body.email,
            }
        });
    }

    const user = await User.create(request.body);
    response.json(user);
};

/**
 * Show forgot password form.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const forgotPasswordForm = (request, response) => {
    response.render('auth/forgot-password', {
        title: 'Recupera tu acceso. 😎'
    });
};