/**
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const loginForm = (request, response) => {
    response.render('auth/login', {
        auth: true
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