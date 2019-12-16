const assert = require('assert')
const MongoDB = require('../db/strategies/mongodb')
const Context = require('../db/strategies/base/ContextStrategy')

const context = new Context(new MongoDB())

const MOCK_HEROI_CADASTRAR = { nome : 'Gaviao Negro', poder:'flexas'}
const MOCK_HEROI_ATUALIZAR = { nome: 'Perna Longa', poder: 'Cenoura'}
let MOCK_HEROI_ID = null

describe('MongoDB Strategy', function (){
    this.timeout(Infinity)
    this.beforeAll( async function () {
       await context.connect()
       
       const result = await context.create(MOCK_HEROI_ATUALIZAR)
       MOCK_HEROI_ID=result._id
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
        const [{nome,poder}] = await context.read({nome : MOCK_HEROI_CADASTRAR.nome })
        const heroiResult = {nome,poder}
        assert.deepEqual(heroiResult, MOCK_HEROI_CADASTRAR)
    })

    it('MongoDB update', async function () {
        const result= await context.update(MOCK_HEROI_ID,{nome :'Homem de Ferro' })
        assert.deepEqual(result.nModified,1)
        
    })

    it('MongoDB delete', async function () {
        const result= await context.delete(MOCK_HEROI_ID)
        
        assert.deepEqual(result.deletedCount,1)
    })
})