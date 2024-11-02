module.exports = class Cliente {
  //campos private
  #codigo;
  #nome;
  #idade;
  constructor() {

    this.#codigo = 0;
    this.#nome = "";
    this.#idade = 0;
  }
  set codigo(c) {
    this.#codigo = c;
  }
  get codigo() {
    return this.#codigo;
  }
  set nome(n) {
    this.#nome = n;
  }
  get nome() {
    return this.#nome;
  }
  set idade(i) {
    if (i > 0)
      this.#idade = i;
    else
      throw "Idade inválida";
  }
  get idade() {
    return this.#idade;
  }
}
//module.exports = Cliente;
  /*
  create table cliente(
codigo serial primary key,
nome varchar(100) not null,
idade int)
*/