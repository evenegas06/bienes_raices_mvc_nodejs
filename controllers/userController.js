/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const loginForm = (request, response) => {
    response.render('auth/login', {
        title: 'Iniciar sesión'
    });
};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const registerForm = (request, response) => {
    response.render('auth/register', {
        title: "Crear cuenta"
    });
};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const forgotPasswordForm = (request, response) => {
    response.render('auth/forgot-password', {
        title: 'Recupera tu acceso a BienesRaíces. 😎'
    });
};