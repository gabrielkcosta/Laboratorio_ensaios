export class Analista {
  constructor(data) {
    this.nome = data.nome;
    this.registro = data.registro;
    this.especialidade = data.especialidade;
  }

  validar() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
      return "O nome do analista é obrigatório e deve ter pelo menos 3 caracteres.";
    }
    if (!this.registro || typeof this.registro !== 'string' || this.registro.trim() === '') {
      return "O registro não pode ficar vazio.";
    }
    if (!this.especialidade || typeof this.especialidade !== 'string' || this.especialidade.trim() === '') {
      return "A especialidade não pode ficar vazia.";
    }
    return null;
  }

  static validarId(id) {
    const numeroId = Number(id);
    if (!Number.isInteger(numeroId) || numeroId <= 0) {
      return false;
    }
    return true;
  }
}