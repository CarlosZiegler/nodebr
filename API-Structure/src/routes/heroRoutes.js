const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

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
                    console.log('Internal Server Error')
                }
                
            }
        }
    }

    create(){
        return {
            path: '/herois',
            method:'POST',
            handler:(request, head) =>{
                return this.db.read()
            }
        }
    }

}

module.exports = HeroRoutes