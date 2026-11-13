export class Ensaio {
  constructor(data) {
    this.nome = data.nome;
    this.norma = data.norma;
    this.status = data.status;
  }

  validar() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
      return "O nome do ensaio é obrigatório e deve ter pelo menos 3 caracteres.";
    }
    if (!this.norma || typeof this.norma !== 'string' || this.norma.trim() === '') {
      return "A norma do ensaio não pode ficar vazia.";
    }
    if (!this.status || typeof this.status !== 'string' || this.status.trim() === '') {
      return "O status do ensaio não pode ficar vazio.";
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