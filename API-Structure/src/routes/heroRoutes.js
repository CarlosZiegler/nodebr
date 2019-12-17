const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path: '/herois',
            method:'GET',
            handler:(request, head) =>{
                try {
                    const {skip, limit, nome} = request.query

                    let query = {}
                    if (nome) {
                        query.nome=nome
                    }
                    if (isNaN(skip) || isNaN(limit) ) {
                        throw Error('Type of Skip or Limit is not a Number ')
                    }
                    return this.db.read(query, parseInt(skip), parseInt(limit))
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