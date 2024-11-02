const mysql = require('mysql2'); //npm i mysql

class Banco {
  static pool
  static conexao
  static async init() {
    try {
      // Establish connection to database
        this.pool = mysql.createPool({
          host: "127.0.0.1",
          user: "root",
          password: "ifsp",
          database: "lpb",
          port: 3306,
          waitForConnections: true,
          connectionLimit: 10,
          maxIdle: 10,
          idleTimeout: 60000,
          queueLimit: 0
        });
        this.conexao = this.pool.promise();
        
    }
    catch (erro) {
      console.log("Erro de conexao : " + erro);
    }
  }
}
module.exports = Banco;