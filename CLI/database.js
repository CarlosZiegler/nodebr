const {
    readFile,
    writeFile
} = require("fs")

const {
    promisify
} = require("util")

//transforma a callback Function to Promise
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor(){
        this.nomeArquivo = "herois.json"
    }
    
    async obterDadosArquivo(){

        const arquivo= await readFileAsync(this.nomeArquivo, 'utf8')
        return JSON.parse(arquivo.toString())

    }

    async cadastrarDados(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <=2 ? heroi.id : Date.now()
        //concatena os dados em apenas um objeto
        const heroiComId= {
            id,
            ...heroi
        }
        //concatena array
        const dadosFinal = [
            ...dados,
            heroiComId
        ]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async escreverArquivo(dados){
        await writeFileAsync(this.nomeArquivo, JSON.stringify(dados))
        return true
    }

    async listar(id){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => ( id ? item.id === id : true))
        return dadosFiltrados
    }

    async remover(id){
        if(!id){
            return await this.escreverArquivo([])
        }

        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error("Usuario nao existe")
        }

        dados.splice(indice,1)
        return await this.escreverArquivo(dados)

    }

    async update(id, dadosUpdate){
        if(!id){
            throw Error("Impossivel atualizar um heroi sem ID")
        }
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error("Heroi nao existe")
        }
        
        dados[indice] = {
            ...dadosUpdate,
            id
        }
        return await this.escreverArquivo(dados)
    }

}

module.exports = new Database()