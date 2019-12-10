const {
    deepEqual,
    ok
} = require("assert")

const database = require('./database')

const DEFAULT_ITEM_CADASTRAR = {
    nome:"Flash",
    poder:"Speed",
    id:1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome:"LANTERNA VERDE",
    poder:"ENERGIA DO ANEL",
    id:2
}

describe('Suite de manipulacao de Herois', ()=>{
    before( async ()=>{
        //zera o arquivo
        await database.escreverArquivo([])
        //popula o arquivo com um Heroi
        await database.cadastrarDados(DEFAULT_ITEM_CADASTRAR)
    })
    it('Deve pesquisar um heroi pelo seu ID, usando arquivos', async ()=>{
        const expect = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expect.id)
        deepEqual(resultado, expect)
    })

    it('Deve retornar uma lista de Herois, usando arquivos', async ()=>{
        const expect =  [DEFAULT_ITEM_CADASTRAR]
        const resultado = await database.listar()
        deepEqual(resultado, expect)
    })

    it('Deve cadastrar um heroi, usando arquivos', async ()=>{
        const expect = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrarDados(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(actual, expect)
    })

    it('Deve deletar um heroi com ID', async ()=>{
        const expect = true
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expect)
    })

    it('Deve atualizar um heroi com ID', async ()=>{
        const expect = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome:"Batman",
            poder:"Dinheiro"
        }
        const dados = { 
            nome:"Batman",
            poder:"Dinheiro"
        }
        const resultCadastrar = await database.cadastrarDados(DEFAULT_ITEM_ATUALIZAR)
        const resultado = await database.update(DEFAULT_ITEM_ATUALIZAR.id, dados )
        const [heroiAtualizado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(heroiAtualizado, expect)
    })

})