const express = require('express');
const Cliente = require("./src/model/Cliente");
const DAO = require("./src/controller/ClienteDAO");
const app = express();

const bodyParser = require('body-parser'); //capturar dados do formulário

// viabiliza o acesso a pasta, deixa tudo público
app.use(express.static(__dirname + '/public'));

//View engine que vai renderizar as páginas
app.set('view engine', 'ejs');
//pastas que vai ficar os templates para serem renderizados.
//app.set("views", path.join(__dirname) + "\\src\\view");
app.set("views", __dirname + '/src/view');
//ler dados dos formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/cad', async function (req, res) {
  const cliente = new Cliente();
  const dao = new DAO();
  const botao = req.body.b1;

  
  var s = "";
  try {
    switch (botao.toLowerCase()) {
      case 'gravar':
        cliente.nome = req.body.txtNome;
        cliente.idade = req.body.txtIdade;

        cliente.codigo= await dao.gravar(cliente);
        s="Salvo com sucesso."
        res.render("mostrar", { codigo: cliente.codigo, nome: cliente.nome, idade: cliente.idade, msg: s });
        break;
      case 'alterar':
        cliente.codigo = req.body.txtCodigo;
        cliente.nome = req.body.txtNome;
        cliente.idade = req.body.txtIdade;
        dao.alterar(cliente)
        res.render("mostrar", { codigo: cliente.codigo, nome: cliente.nome, idade: cliente.idade, msg: s });

        break;
      case 'remover':
        cliente.codigo = req.body.txtCodigo;
        dao.remover(cliente);
        res.render("mostrar", { codigo: cliente.codigo, nome: cliente.nome, idade: cliente.idade, msg: s });
        break;
      case 'listar':
        cliente.nome = req.body.txtNome;
        let resp = await dao.listar(cliente);
        res.render("mostrarTabela", { tabela: resp });
        break;
    }
  }
  catch (err) {
    console.log(err);
  }

});


//deixa o servidor no ar
app.listen(3000, function (err) {
  if (err)
    console.log(err);
  else {
    console.log('Servidor escutando a porta: 3000 ');
  }
});
