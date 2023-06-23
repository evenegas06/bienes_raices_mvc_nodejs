import Request from "express";
import Response from "express";

/**
 * Show login form.
 * 
 * @param {Request} request 
 * @param {Response} response 
 */
export const loginForm = (request, response) => {
    response.render('auth/login', {
        title: 'Iniciar sesión'
    });
};

/**
 * Show register form.
 * 
 * @param {Request} request 
 * @param {Response} response 
 */
export const registerForm = (request, response) => {
    response.render('auth/register', {
        title: "Crear cuenta"
    });
};

/**
 * Show forgot password form.
 * 
 * @param {Request} request 
 * @param {Response} response 
 */
export const forgotPasswordForm = (request, response) => {
    response.render('auth/forgot-password', {
        title: 'Recupera tu acceso. 😎'
    });
};