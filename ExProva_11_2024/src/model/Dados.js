
module.exports = class Dados{
    atributoPublicoCodigo
    atributoPublicoNome
    //ORM -> Object Relation Mapping 
    constructor() {
        this.atributoPublicoCodigo = -1
        this.atributoPublicoNome = "Z"
    }
    set codigo(n) {
         this.atributoPublicoCodigo=n
    }
    
    get codigo() {
        return(this.atributoPublicoCodigo)
    }

    set nome(n) {
        if(n.length >1)
            this.atributoPublicoNome = n
        else
            throw ("Nome muito pequeno")
   }
   get nome() {
       return(this.atributoPublicoNome)
    }

}