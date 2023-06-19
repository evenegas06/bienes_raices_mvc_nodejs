export const loginForm = (request, response) => {
    response.render('auth/login', {
        auth: true
    });
};

export const registerForm = (request, response) => {
    response.render('auth/register', {
        auth: true
    });
};