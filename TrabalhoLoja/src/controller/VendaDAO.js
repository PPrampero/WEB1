const Banco = require("../model/Banco")

module.exports = class VendaDAO {

    async gravar(obj) {
        try {
            Banco.init();
            const res = await Banco.conexao.query(
                'INSERT INTO venda(total,codcli) VALUES($1,$2) RETURNING codigo', [obj.total, obj.codcli]);
            Banco.conexao.end();
            return res.rows[0].codigo
        }
        catch (erro) {
            console.log(erro);
        }
    }
}  