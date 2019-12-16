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
            url:'/herois'
        })
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))

    })
   
})