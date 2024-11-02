const Banco = require('../model/Banco');

class ClienteDAO {
  async gravar(obj) {
    try {
      Banco.init();
      //await Banco.conexao.query('INSERT INTO cliente(nome,idade) VALUES(?,?) ', [obj.nome, obj.idade]);//só insere e não pega o código
      const [results] = await Banco.conexao.query('INSERT INTO cliente(nome,idade) VALUES(?,?)', [obj.nome, obj.idade])
      Banco.conexao.end()
      return results.insertId
    }
    catch (erro) {
      console.log(erro);
    }
  }

  async alterar(obj) {
    try {
      Banco.init();
      await Banco.conexao.query('Update cliente set nome=?, idade=? where codigo = ?', [obj.nome, obj.idade, obj.codigo]);
      Banco.conexao.end();
    }
    catch (erro) {
      console.log(erro);
    }

  }

  async remover(obj) {
    try {
      Banco.init();
      await Banco.conexao.query('Delete from cliente where codigo = ?', [obj.codigo]);
      Banco.conexao.end();
    }
    catch (erro) {
      console.log(erro);
    }

  }
  async listar(obj) {
    try {
      Banco.init();
      const [tabela, tipo] = await Banco.conexao.query(
        'Select codigo,nome, idade from cliente where nome like ? order by codigo', ["%" + obj.nome + "%"]);
      Banco.conexao.end()
      return (tabela)
    }
    catch (erro) {
      console.log(erro);
    }
  }
}
module.exports = ClienteDAO;