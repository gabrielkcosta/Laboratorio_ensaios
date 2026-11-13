import conexao from '../database/conexao.js';

export async function criarEquipamento(equipamento) {
  const { nome, patrimonio, situacao } = equipamento;
  const sql = 'INSERT INTO equipamento (nome, patrimonio, situacao) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [nome, patrimonio, situacao]);
  return { id_equipamento: resultado.insertId, nome, patrimonio, situacao };
}

export async function listarEquipamentos() {
  const sql = 'SELECT * FROM equipamento';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarEquipamentoPorId(id) {
  const sql = 'SELECT * FROM equipamento WHERE id_equipamento = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarEquipamento(id, dados) {
  const campos = [];
  const valores = [];

  for (const [chave, valor] of Object.entries(dados)) {
    campos.push(`${chave} = ?`);
    valores.push(valor);
  }
  valores.push(id);

  const sql = `UPDATE equipamento SET ${campos.join(', ')} WHERE id_equipamento = ?`;
  await conexao.execute(sql, valores);
  return buscarEquipamentoPorId(id);
}

export async function excluirEquipamento(id) {
  const sql = 'DELETE FROM equipamento WHERE id_equipamento = ?';
  await conexao.execute(sql, [id]);
}