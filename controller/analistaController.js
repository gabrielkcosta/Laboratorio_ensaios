import { Analista } from '../model/Analista.js';
import * as analistaRepository from '../repository/analistaRepository.js';

export async function cadastrar(req, res) {
  try {
    const analistaModel = new Analista(req.body);
    const erroValidacao = analistaModel.validar();
    if (erroValidacao) {
      return res.status(400).json({ erro: erroValidacao });
    }
    const novo = await analistaRepository.criarAnalista(analistaModel);
    return res.status(201).json(novo);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao cadastrar analista.', detalhes: error.message });
  }
}

export async function listar(req, res) {
  try {
    const lista = await analistaRepository.listarAnalistas();
    return res.status(200).json(lista);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao listar analistas.', detalhes: error.message });
  }
}

export async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    if (!Analista.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const item = await analistaRepository.buscarAnalistaPorId(id);
    if (!item) {
      return res.status(404).json({ erro: 'Analista não encontrado.' });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao buscar analista.', detalhes: error.message });
  }
}

export async function atualizarParcial(req, res) {
  try {
    const { id } = req.params;
    if (!Analista.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const existente = await analistaRepository.buscarAnalistaPorId(id);
    if (!existente) {
      return res.status(404).json({ erro: 'Analista não encontrado.' });
    }

    const dadosAtualizacao = req.body;
    if (Object.keys(dadosAtualizacao).length === 0) {
      return res.status(400).json({ erro: 'Nenhum campo fornecido para atualização.' });
    }

    const atualizado = await analistaRepository.atualizarAnalista(id, dadosAtualizacao);
    return res.status(200).json(atualizado);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao atualizar analista.', detalhes: error.message });
  }
}

export async function excluir(req, res) {
  try {
    const { id } = req.params;
    if (!Analista.validarId(id)) {
      return res.status(400).json({ erro: 'ID inválido.' });
    }
    const existente = await analistaRepository.buscarAnalistaPorId(id);
    if (!existente) {
      return res.status(404).json({ erro: 'Analista não encontrado.' });
    }
    await analistaRepository.excluirAnalista(id);
    return res.status(200).json({ mensagem: 'Analista excluído com sucesso.' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao excluir analista.', detalhes: error.message });
  }
}