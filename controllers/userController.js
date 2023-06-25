/**
 * Show login form.
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export const loginForm = (request, response) => {
    response.render('auth/login', {
        title: 'Iniciar sesión'
    });
};

/**
 * Show register form.
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export const registerForm = (request, response) => {
    response.render('auth/register', {
        title: "Crear cuenta"
    });
};

/**
 * Save new user on data base.
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export const register = (request, response) => {
    console.log(request.body);
};

/**
 * Show forgot password form.
 * 
 * @param {import("express").Request} request 
 * @param {import("express").Response} response 
 */
export const forgotPasswordForm = (request, response) => {
    response.render('auth/forgot-password', {
        title: 'Recupera tu acceso. 😎'
    });
};