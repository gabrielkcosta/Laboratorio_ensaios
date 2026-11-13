import { Router } from 'express';
import * as AnalistaController from '../controller/analistaController.js';

const router = Router();

router.post('/analista', AnalistaController.cadastrar);
router.get('/analista', AnalistaController.listar);
router.get('/analista/:id', AnalistaController.buscarPorId);
router.patch('/analista/:id', AnalistaController.atualizarParcial);
router.delete('/analista/:id', AnalistaController.excluir);

export default router;