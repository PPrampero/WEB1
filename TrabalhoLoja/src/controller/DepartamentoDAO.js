const Banco = require("../model/Banco")
//DAO -> Data Access Object
module.exports = class DepartamentoDAO {

    async listar () {
        try {
            Banco.init();
        let tabela = await Banco.conexao.query('Select codigo,nome from departamento order by 2');
            Banco.conexao.end();
            return tabela
        }
        catch (erro) {
            console.log(erro);
        }
    }
}