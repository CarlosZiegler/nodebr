const ICrud = require('./../strategies/interfaces/ICrud')
const Mongoose = require('mongoose')
const STATUS = {
    0:"Disconnected",
    1:"Connected",
    2:"Connecting",
    3:"Disconnecting"
}


class MongoDB extends ICrud {
    constructor(){
        super()
        this._herois = null
        this._driver = null
        this._connection = null
    }
    async isConected(){
        const state = STATUS[this._driver.readyState]
        if (state === 'Connected') {
            
            return state
        }
        if (state !== 'Connecting') {
            return state
        }
        await new Promise(resolve => setTimeout(resolve,1000))
        return STATUS[this._driver.readyState]

    }
    async connect(){
        Mongoose.connect('mongodb://carlos:carlos@192.168.99.100:27017/herois', {useNewUrlParser: true}, function (error) {
            if(error){
            return console.log('Falha na conexao', error)
            }
        })

        this._driver = Mongoose.connection
        await this.defineModel()
        this._driver.once('open', ()=>{ console.log('Database running')})
        

    }
    async defineModel(){
        const heroisSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required:true
            },
            poder: {
                type: String,
                required:true
            },
            insertedAt: {
                type: Date,
                default:new Date()
            }  
        })
        
        this._herois = await Mongoose.model('herois',heroisSchema)
        

    }
    async create(item){
        return await this._herois.create({nome:item.nome, poder:item.poder})
        
    }

    async read(item ={}, skip=0, limit= 10){
        return await this._herois.find(item).skip(skip).limit(limit)
        
    }

    async update(id,item){

        return await this._herois.updateOne({ _id: id }, { $set: item })
    }

    async delete(id){
        return await this._herois.deleteOne({ _id: id });
        
    }

}
module.exports = MongoDB







