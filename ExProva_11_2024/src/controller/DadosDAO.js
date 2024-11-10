const Banco = require("../model/Banco")

//DAO -> Data Access Object
module.exports = class DadosDAO {
  async gravar(obj) {
    try {
      Banco.init();
      const res = await Banco.conexao.query('INSERT INTO dados(nome) VALUES($1) RETURNING codigo',[obj.atributoPublicoNome]);
      //Banco.conexao.end();
      return res.rows[0].codigo
    }
    catch (erro) {
      console.log(erro);
    }
  }
}