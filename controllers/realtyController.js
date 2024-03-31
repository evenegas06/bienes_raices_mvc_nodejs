import express from 'express';

/**
 * 
 * 
 * @param {express.Request} request 
 * @param {express.Response} response 
 */
export const admin = (request, response) => {
    response.render('realty/admin', {
        title: 'Mis propiedades',
        navbar: true
    });
};