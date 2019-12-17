const assert = require('assert')
const api = require('./../api')

let app = {}

describe.only('API - Tests', function (){
    
    this.beforeAll( async function () {
       app = await api
    })
    it('Route /herois', async function () {
        const result = await app.inject({
            method:'GET',
            url:'/herois?skip=0&limit=30'
        })
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))

    })
    it('Route /herois Paginacao', async function () {
        const TAMANHO_LIMITE = 1
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`
        })
        
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
        assert.ok(dados.length === TAMANHO_LIMITE)

    })
    it('Route /herois Paginacao com parametro String', async function () {
        const TAMANHO_LIMITE = 1
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=eva&limit=${TAMANHO_LIMITE}`
        })
        
        const {statusCode} = result
        assert.deepEqual(statusCode, 500)
        

    })
    it('Route /herois Paginacao com parametro String', async function () {
        const NOME = 'Batman'
        const result = await app.inject({
            method:'GET',
            url:`/herois?nome=${NOME}&skip=0&limit=1`
        })
        
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        

    })
})