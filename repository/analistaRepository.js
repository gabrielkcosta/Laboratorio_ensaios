import conexao from '../database/conexao.js';

export async function criarAnalista(analista) {
  const { nome, registro, especialidade } = analista;
  const sql = 'INSERT INTO analista (nome, registro, especialidade) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [nome, registro, especialidade]);
  return { id_analista: resultado.insertId, nome, registro, especialidade };
}

export async function listarAnalistas() {
  const sql = 'SELECT * FROM analista';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarAnalistaPorId(id) {
  const sql = 'SELECT * FROM analista WHERE id_analista = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarAnalista(id, dados) {
  const campos = [];
  const valores = [];

  for (const [chave, valor] of Object.entries(dados)) {
    campos.push(`${chave} = ?`);
    valores.push(valor);
  }
  valores.push(id);

  const sql = `UPDATE analista SET ${campos.join(', ')} WHERE id_analista = ?`;
  await conexao.execute(sql, valores);
  return buscarAnalistaPorId(id);
}

export async function excluirAnalista(id) {
  const sql = 'DELETE FROM analista WHERE id_analista = ?';
  await conexao.execute(sql, [id]);
}