import express from 'express';
import { getMensajes,  getMensajeById, createMensaje, updateMensaje, deleteMensaje } from '../controllers/mensajesController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Routes to obtain and modify user data
router.get('/', authenticateToken, getMensajes);
router.get('/:id', authenticateToken, getMensajeById);
router.post('/', authenticateToken, createMensaje);
router.patch('/:id', authenticateToken, updateMensaje);
router.delete('/:id', authenticateToken, deleteMensaje);

export default router;
