const ICrud = require('./../strategies/interfaces/ICrud')

class Postgres extends ICrud {
    constructor(){
        super()
    }

    create(item){
        console.log("Item foi salvo Postgres")
        
    }

    read(query){
        console.log("Item foi lido Postgres")
    }

    update(id,item){
        console.log("Item foi atualizado Postgres")
    }

    

}
module.exports = Postgres