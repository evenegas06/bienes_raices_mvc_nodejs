import express from 'express';

const router = express.Router();

router.get('/', (request, response) => {
    response.send('Hola Mundo!!');
});

router.get('/info', (request, response) => {
    response.json({ message: 'Información no disponible.' });
});

export default router;