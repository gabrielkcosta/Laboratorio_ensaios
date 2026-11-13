import { Router } from 'express';
import * as EnsaioController from '../controller/ensaioController.js';

const router = Router();

router.post('/ensaio', EnsaioController.cadastrar);
router.get('/ensaio', EnsaioController.listar);
router.get('/ensaio/:id', EnsaioController.buscarPorId);
router.patch('/ensaio/:id', EnsaioController.atualizarParcial);
router.delete('/ensaio/:id', EnsaioController.excluir);

export default router;