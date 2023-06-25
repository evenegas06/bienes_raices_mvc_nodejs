import express from 'express';
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
        title: "Crear cuenta"
    });
};

/**
 * Save new user on data base.
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const register = async (request, response) => {
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