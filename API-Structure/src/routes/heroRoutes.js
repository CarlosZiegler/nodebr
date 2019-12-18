const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

class HeroRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path: '/herois',
            method:'GET',
            config: {
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit:Joi.number().integer().default(100),
                        nome:Joi.string().optional().allow('').min(3).max(100).default('')
                    }
                }
            },
            handler:(request, head) =>{
                try {
                    const {skip, limit, nome} = request.query

                    let query = {
                        nome : {$regex : `.*${nome}.*`}
                    }                    
                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }

    create(){
        return {
            path: '/herois',
            method:'POST',
            config: {
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    payload:{
                        nome:Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(30)
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {nome, poder} = request.payload
                    const item = {nome,poder}               
                    const result = await this.db.create(item)
                    return {
                        message: "Heroi Cadastrado com Sucesso!",
                        _id: result._id
                    }

                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }

    update(){
        return {
            path: '/herois/{id}',
            method:'PATCH',
            config: {
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    params: {
                        id: Joi.string().required()
                    },
                    payload:{
                        nome:Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(30)
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {id} = request.params
                    const {payload} = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)         
                    const result = await this.db.update(id , dados)
                    if (result.nModified != 1) {
                        return Boom.preconditionFailed('ID nao encontrado no Banco')
                    }
                    return {
                        message: "Heroi atualizado com Sucesso!",
                        _id: result._id
                    }

                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }
    delete(){
        return {
            path: '/herois/{id}',
            method:'DELETE',
            config: {
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {id} = request.params
                            
                    const result = await this.db.delete(id)
                    if (result.deletedCount != 1) {
                        return Boom.preconditionFailed('ID nao encontrado no Banco')
                    }
                    return {
                        message: "Heroi deletado com Sucesso!",
                    }

                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }

}

module.exports = HeroRoutes