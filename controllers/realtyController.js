/**
 * Show admin view.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const admin = (request, response) => {
    response.render('realty/admin', {
        title: 'Mis propiedades',
        navbar: true
    });
};

/**
 * Show create realty form.
 * 
 * @param {*} request 
 * @param {*} response 
 */
export const create = (request, response) => {
    response.render('realty/create', {
        title: 'Crear Propiedad',
        navbar: true,
    })
};