const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/ContextStrategy')

const context = new Context(new MongoDB())

const MOCK_HEROI_CADASTRAR = { nome : 'Gaviao Negro', poder:'flexas'}
const MOCK_HEROI_ATUALIZAR = { nome: 'Gaviao Negro', poder: 'flexas'}

describe('MongoDB Strategy', function (){
    this.timeout(Infinity)
    this.beforeAll( async function () {
       await context.connect()
       
       //await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('MongoDB Connection', async function () {
        const result = await context.isConected()
        assert.equal(result,'Connected')
    })
    it('MongoDB Cadastrar', async function () {
        const {nome, poder} = await context.create(MOCK_HEROI_CADASTRAR)
        
        assert.deepEqual({nome,poder},MOCK_HEROI_CADASTRAR)
    })

    it('MongoDB Listar', async function () {
        const result = await context.read({nome : MOCK_HEROI_CADASTRAR.nome })
        const [{nome,poder}] = await context.read({nome : MOCK_HEROI_CADASTRAR.nome })
        //const result = {nome,poder}
        console.log(result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('MongoDB update', async function () {
        const [itemAtualizar] = await context.read({nome : MOCK_HEROI_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR, 
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update( itemAtualizar.id, novoItem)
        const [resultDados] = await context.read({id : itemAtualizar.id })
        
        assert.deepEqual(result,1)
        assert.deepEqual(resultDados.nome,novoItem.nome)
    })

    it('MongoDB delete', async function () {
        const [itemDeletar] = await context.read({nome : MOCK_HEROI_CADASTRAR.nome })
        const result = await context.delete( itemDeletar.id)
        const [resultDados] = await context.read({id : itemDeletar.id })
        
        assert.deepEqual(result,1)
        assert.deepEqual(resultDados,undefined)
    })
})