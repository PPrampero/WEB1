const Banco = require("../model/Banco")

//DAO -> Data Access Object
module.exports = class ProdutoDAO {

    async listar(codDepartamento) {
        try {
            Banco.init();
            let tabela = await Banco.conexao.query('select codigo,descricao,preco,qtde,imagem,coddep from produto where coddep = $1 order by 2',[codDepartamento]);
            Banco.conexao.end();
            return tabela
        }
        catch (erro) {
            console.log("Erro no listar departamento: "+erro);
        }
    }
}