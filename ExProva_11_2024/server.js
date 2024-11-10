const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

const Dados = require("./src/model/Dados")
const DadosDAO = require('./src/controller/DadosDAO')


const app = new express()
//configurar o body parser
app.use(bodyParser.urlencoded({ extended: true }))
//configurar o ejs
app.set("view engine", 'ejs')
app.set("views", __dirname + "/src/view")

//configurar a sessão
app.use(session({
    secret: 'ExemploBasicoProva',
    resave: true,
    saveUninitialized:true
    
}));


app.get('/', function (req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.post('/cadastrar', async function(req, res) {
    let dado=null
    let v= null
    let botao = String(req.body.b1).trim()
    try {
        if (botao.localeCompare("Gravar") == 0) {
            dado = new Dados()
            dado.nome = String(req.body.txtNome)
            if (req.session.vetor != null) {
                v=req.session.vetor
            }
            else {
                v=new Array()
            }
            v.push(dado)
            req.session.vetor = v
            res.send("<br>"+dado.nome+" incluído na sessão com sucesso.</br>")
        }
        if (botao.localeCompare("Listar") == 0) {
            if (req.session.vetor != null) {
                v = req.session.vetor
                let s = "<h1> Lista de nomes cadastrados </h1>"
                for (let i = 0; i < v.length; i++){
                    s=s+v[i].atributoPublicoNome+"<br/>"
                }
                res.send(s)
            }
            else {
                res.send("<h1>Lista Vazia.</h1>")
            }
        }
        if (botao.localeCompare("Finalizar") == 0) {
            if (req.session.vetor != null) {
                v = req.session.vetor
                let dao = new DadosDAO()
                let s = "<h1> Lista de nomes cadastrados </h1>"
                for (let i = 0; i < v.length; i++){
                    dao.gravar(v[i])
                }
                delete req.session.vetor // limpa sessão
                v.splice(0, v.length); // limpa vetor
                res.send("Tudo salvo no banco e limpo")
            }
            else {
                res.send("<h1>Lista Vazia.</h1>")
            }
        }

    }
    catch (erro) {
        res.send("Erro ->"+erro)
        console.log("Erro ->"+erro)
    }
})

app.listen(3000, function (erro) {
    if (erro) {
        console.log("Erro no servidor : "+ erro)
    }
    else {
        console.log("Servidor no ar na porta 3000")
    }
})