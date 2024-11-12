const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const ClienteDAO = require('./src/controller/ClienteDAO')
const Cliente = require('./src/model/Cliente')
const DepartamentoDAO = require('./src/controller/DepartamentoDAO')
const ProdutoDAO = require('./src/controller/ProdutoDAO')
const Produto = require('./src/model/Produto')

const app = new express()
//public é a pasta com conteúdo público
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set("views", __dirname + "\\src\\view");

app.use(session({
    secret: 'trabalhomuitofacil',
    resave: true,
    saveUninitialized:true
}));
//////Funções MidleWare
app.get("/finalizar", function (req, res, next) {
    if (req.session.usuario != null) {
        next()
    }
    else {
        res.redirect("template/login.html")
    }
})

//Tratamento de rotas
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")

})

app.post("/login", async function (req, res) {
    let login=req.body.txtLogin
    let senha = req.body.txtSenha
    let dao = new ClienteDAO()
    let  cliente = null
    try {
        cliente = await dao.login(login, senha)
        if (cliente != null) {
            req.session.usuario = cliente
            res.send(cliente.nome+" logado com sucesso.")
        }
        else {
            session.usuario = null
            res.send("Erro no login/senha")
        }
    }
    catch (erro) {
        console.log("Erro no login : "+ erro)
    }

})

app.get("/ListarDep", async function (req, res) {
    let dao = new DepartamentoDAO()
    let tabela = await dao.listar()
    res.render('departamento',{tabela})
})

app.get('/listarProduto/:codigo', async function (req, res) {
    try {
        let codigo = parseInt(req.params.codigo)
        let dao = new ProdutoDAO();
        let tabela = await dao.listar(codigo)
        res.render("produto", { tabela })
    }
    catch(erro){console.log(erro)}
})

app.post('/comprar', function (req, res) {
    try {
        let v=null
        let obj = new Produto()
        obj.codigo=parseInt(req.body.txtCodigo)
        obj.descricao=String(req.body.txtDescricao)
        obj.preco=parseFloat(req.body.txtPreco)
        obj.qtde = parseInt(req.body.txtQtde)
        if (req.session.carrinho != null)
            v = req.session.carrinho
        else
            v = new Array()
        v.push(obj)
        req.session.carrinho = v
        res.redirect("/mostrarCarrinho")
    }catch(erro){console.log(erro)}
})

app.get('/mostrarCarrinho', function (req, res) {
    
    try {
        let v = req.session.carrinho
        /*let s=""
        for (i = 0; i < v.length; i++){
            s=s+v[i].descricao+"\n"
        }
        console.log(s)
        res.send("Comprado")
        */
        res.render("carrinho", {carrinho: v })
    }catch(erro){console.log(erro)}
})

app.get("/finalizar", function (req, res) {
    res.send("Compra finalizada")
})

app.listen(3000, function (erro) {
    if (erro) {
        console.log(" Erro no servidor : "+ erro)
    }
    else {
        console.log("Servidor rodando na porta 3000")
    }
})