import express from 'express';
import { admin, create } from '../controllers/realtyController.js';

const router = express.Router();

router.get('/mis-propiedades', admin);
router.get('/propiedades/crear', create);

export default router;
