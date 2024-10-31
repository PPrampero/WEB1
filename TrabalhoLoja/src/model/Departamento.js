module.exports = class Departamento{
 
    #codigo
    #nome
   constructor() {
        this.#codigo = 0
        this.#nome=""
    }
    set codigo(c) {
        this.#codigo=c
    }
    get codigo() {
        return(this.#codigo)
    }
    set nome(n) {
        this.#nome=n
    }
    get nome() {
        return(this.#nome)
    }
}