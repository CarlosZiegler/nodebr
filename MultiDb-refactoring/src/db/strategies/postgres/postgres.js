const ICrud = require('../interfaces/ICrud')
const Sequelize =  require('sequelize')

class Postgres extends ICrud {
    constructor(connection, schema){
        super()
        this._connection=connection
        this._schema=schema
        
    }

    async create(item){
        const { dataValues} = await this._schema.create(item)
        return dataValues 
    }

    async read(item = {}){
        return await this._schema.findAll({where : item ,raw:true })
        
    }

    async update(id,item){
        if(!id){
            throw Error("Impossivel atualizar um heroi sem ID")
        }
        //const [heroi] = await this._schema.findAll({where : id ,raw:true })
        return await this._schema.update(item, {where : {id:id}})
    }

    async delete(id){
        if(!id){
            throw Error("Impossivel atualizar um heroi sem ID")
        }
        //const [heroi] = await this._schema.findAll({where : id ,raw:true })
        return await this._schema.destroy({where : {id:id}})
    }
    async isConected(){
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.error('Error DBConnect')
            return false
        }
    }
    //Privado com underline na frente
    static async connect(){
        const connection = new Sequelize(
            'heros',
            'carlos',
            'carlos',
            { 
                host:'192.168.99.100',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false,
                logging:false
            }
        )
        
        return connection
    }

    static async defineModel(connection, schema){
        
        const model =  await connection.define(
            schema.name, schema.schema, schema.options
        )

        await model.sync()
        return model
    }
    
    

}
module.exports = Postgres