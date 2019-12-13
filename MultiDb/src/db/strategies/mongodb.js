const ICrud = require('./../strategies/interfaces/ICrud')


class MongoDB extends ICrud {
    constructor(){
        super()
    }
    isConected(){

    }
    connect(){

    }

    create(item){
        console.log("Item foi salvo MongoDB")
        
    }

    read(query){
        console.log("Item foi lido MongoDB")
    }

    update(id,item){
        console.log("Item foi atualizado MongoDB")
    }

    delete(id){
        console.log("Item foi deletado MongoDB")
    }

}
module.exports = MongoDB