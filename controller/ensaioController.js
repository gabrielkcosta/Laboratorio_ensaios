import { Ensaio } from '../model/Ensaio.js';
import * as ensaioRepository from '../repository/ensaioRepository.js';

export async function cadastrar(req, res) {
  try {
    const ensaioModel = new Ensaio(req.body);
    const erroValidacao = ensaioModel.validar();
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }
    const novoEnsaio = await ensaioRepository.criarEnsaio(ensaioModel);
    return res.status(201).json(novoEnsaio);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao cadastrar ensaio.', detalhes: error.message });
  }
}

export async function listar(req, res) {
  try {
    const ensaios = await ensaioRepository.listarEnsaios();
    return res.status(200).json(ensaios);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao listar ensaios.', detalhes: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    if (!Ensaio.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const ensaio = await ensaioRepository.buscarEnsaioPorId(id);
    if (!ensaio) {
      return res.status(404).json({ erro: 'Ensaio não encontrado.' });
    }
    return res.status(200).json(ensaio);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao buscar ensaio.', detalhes: error.message });
  }
}

export async function atualizarParcial(req, res) {
  try {
    const { id } = req.params;
    if (!Ensaio.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const existente = await ensaioRepository.buscarEnsaioPorId(id);
    if (!existente) {
      return res.status(404).json({ erro: 'Ensaio não encontrado.' });
    }

    const dadosAtualizacao = req.body;
    if (Object.keys(dadosAtualizacao).length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo fornecido para atualização.' });
    }

    const atualizado = await ensaioRepository.atualizarEnsaio(id, dadosAtualizacao);
    return res.status(200).json(atualizado);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao atualizar ensaio.', detalhes: error.message });
  }
}

export async function excluir(req, res) {
  try {
    const { id } = req.params;
    if (!Ensaio.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const existente = await ensaioRepository.buscarEnsaioPorId(id);
    if (!existente) {
      return res.status(404).json({ erro: 'Ensaio não encontrado.' });
    }
    await ensaioRepository.excluirEnsaio(id);
    return res.status(200).json({ mensagem: 'Ensaio excluído com sucesso.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao excluir ensaio.', detalhes: error.message });
  }
}