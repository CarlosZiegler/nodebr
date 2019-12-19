const assert = require('assert')
const api = require('./../api')
var ObjectId = require('mongodb').ObjectID;

let app = {}


describe('Auth - Tests', function (){
    
    this.beforeAll( async function () {
       app = await api
       
    
    })
    it('Deve obter Token', async function () {
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: {
                username: 'xuxa',
                password: 'admin'
            },
            
        })
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10 )

    })
    
})