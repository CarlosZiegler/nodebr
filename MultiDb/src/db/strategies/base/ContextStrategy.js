
const ICrud = require('./../interfaces/ICrud')

class ContextStrategy extends ICrud {

    constructor(strategy){
        super()
        this._database = strategy
    }

    create(item){
        return this._database.create(item)
    }

    read(query){
        return this._database.create(query)
    }

    update(id,item){
        return this._database.create(id,item)
    }

    delete(id){
        return this._database.create(id)
    }

}

module.exports = ContextStrategy