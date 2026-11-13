export class Equipamento {
  constructor(data) {
    this.nome = data.nome;
    this.patrimonio = data.patrimonio;
    this.situacao = data.situacao;
  }

  validar() {
    if (!this.nome || typeof this.nome !== 'string' || this.nome.trim().length < 3) {
      return "O nome do equipamento é obrigatório e deve ter pelo menos 3 caracteres.";
    }
    if (!this.patrimonio || typeof this.patrimonio !== 'string' || this.patrimonio.trim() === '') {
      return "O patrimônio não pode ficar vazio.";
    }
    if (!this.situacao || typeof this.situacao !== 'string' || this.situacao.trim() === '') {
      return "A situação não pode ficar vazia.";
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