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
    const { name, email, password } = request.body;

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
        .equals(password)
        .withMessage('Las contraseñas no coinciden.')
        .run(request);

    /* Input errors */
    const validation = validationResult(request);

    if (!validation.isEmpty()) {
        return response.render('auth/register', {
            title: 'Crear cuenta',
            errors: validation.array(),
            user: {
                name: name,
                email: email,
            }
        });
    }

    /* Check if email exists on database */
    const user_exists = await User.findOne({ where: { email } });

    if (user_exists) {
        return response.render('auth/register', {
            title: 'Crear cuenta',
            errors: [{ msg: 'Este correo ya se ha registrado, intenta con otro.' }],
            user: {
                name: name,
            }
        });
    }

    /* Save user on database */
    await User.create({
        name,
        email,
        password,
        token: 123
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
        title: 'Recupera tu acceso. 😎'
    });
};