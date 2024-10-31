const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const ClienteDAO = require('./src/controller/ClienteDAO');
const DepartamentoDAO = require('./src/controller/DepartamentoDAO');

const app = new express()

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', __dirname + "/src/view")

app.use(session({
    secret: 'TrabalhoBicoMateigaBabaSopa',
    resave: true,
    saveUninitialized:true
}));


app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.post('/login', async function (req, res) {
    let login = req.body.txtLogin
    let senha = req.body.txtSenha
    let dao = new ClienteDAO()
    let cliente = null
    try {
       
        cliente = await dao.login(login, senha)
        if (cliente != null) {
            session.usuario = cliente
            res.send(cliente.nome+" logado com sucesso.")
        }
        else {
            session.usuario=null
            res.send("Erro no login/senha")
        }
    }
    catch (erro) {
        console.log("Erro no login: "+erro)
    }
})

app.get('/ListarDep', async function (req, res) {

    let dao = new DepartamentoDAO()
    let tabela = await dao.listar()
    res.render("departamento", { tabela })
    
})
app.listen(3000, function (erro) {
    if (erro) {
        console.log("Erro no servidor: "+erro)
    }
    else {
        console.log("Servidor rodando na porta 3000")
    }
})