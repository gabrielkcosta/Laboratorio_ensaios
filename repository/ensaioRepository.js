import conexao from '../database/conexao.js';

export async function criarEnsaio(ensaio) {
  const { nome, norma, status } = ensaio;
  const sql = 'INSERT INTO ensaio (nome, norma, status) VALUES (?, ?, ?)';
  const [resultado] = await conexao.execute(sql, [nome, norma, status]);
  return { id_ensaio: resultado.insertId, nome, norma, status };
}

export async function listarEnsaios() {
  const sql = 'SELECT * FROM ensaio';
  const [linhas] = await conexao.execute(sql);
  return linhas;
}

export async function buscarEnsaioPorId(id) {
  const sql = 'SELECT * FROM ensaio WHERE id_ensaio = ?';
  const [linhas] = await conexao.execute(sql, [id]);
  return linhas[0] || null;
}

export async function atualizarEnsaio(id, dados) {
  const campos = [];
  const valores = [];

  for (const [chave, valor] of Object.entries(dados)) {
    campos.push(`${chave} = ?`);
    valores.push(valor);
  }
  valores.push(id);

  const sql = `UPDATE ensaio SET ${campos.join(', ')} WHERE id_ensaio = ?`;
  await conexao.execute(sql, valores);
  return buscarEnsaioPorId(id);
}

export async function excluirEnsaio(id) {
  const sql = 'DELETE FROM ensaio WHERE id_ensaio = ?';
  await conexao.execute(sql, [id]);
}