import { Equipamento } from '../model/Equipamento.js';
import * as equipamentoRepository from '../repository/equipamentoRepository.js';

export async function cadastrar(req, res) {
  try {
    const eqModel = new Equipamento(req.body);
    const erroValidacao = eqModel.validar();
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }
    const novo = await equipamentoRepository.criarEquipamento(eqModel);
    return res.status(201).json(novo);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao cadastrar equipamento.', detalhes: error.message });
  }
}

export async function listar(req, res) {
  try {
    const lista = await equipamentoRepository.listarEquipamentos();
    return res.status(200).json(lista);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao listar equipamentos.', detalhes: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    if (!Equipamento.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const item = await equipamentoRepository.buscarEquipamentoPorId(id);
    if (!item) {
      return res.status(404).json({ erro: 'Equipamento não encontrado.' });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao buscar equipamento.', detalhes: error.message });
  }
}

export async function atualizarParcial(req, res) {
  try {
    const { id } = req.params;
    if (!Equipamento.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const existente = await equipamentoRepository.buscarEquipamentoPorId(id);
    if (!existente) {
      return res.status(404).json({ erro: 'Equipamento não encontrado.' });
    }

    const dadosAtualizacao = req.body;
    if (Object.keys(dadosAtualizacao).length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo fornecido para atualização.' });
    }

    const atualizado = await equipamentoRepository.atualizarEquipamento(id, dadosAtualizacao);
    return res.status(200).json(atualizado);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao atualizar equipamento.', detalhes: error.message });
  }
}

export async function excluir(req, res) {
  try {
    const { id } = req.params;
    if (!Equipamento.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const existente = await equipamentoRepository.buscarEquipamentoPorId(id);
    if (!existente) {
      return res.status(404).json({ erro: 'Equipamento não encontrado.' });
    }
    await equipamentoRepository.excluirEquipamento(id);
    return res.status(200).json({ mensagem: 'Equipamento excluído com sucesso.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao excluir equipamento.', detalhes: error.message });
  }
}