import { Router } from 'express';
import * as EquipamentoController from '../controller/equipamentoController.js';

const router = Router();

router.post('/equipamento', EquipamentoController.cadastrar);
router.get('/equipamento', EquipamentoController.listar);
router.get('/equipamento/:id', EquipamentoController.buscarPorId);
router.patch('/equipamento/:id', EquipamentoController.atualizarParcial);
router.delete('/equipamento/:id', EquipamentoController.excluir);

export default router;