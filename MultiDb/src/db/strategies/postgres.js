const ICrud = require('./../strategies/interfaces/ICrud')
const Sequelize =  require('sequelize')

class Postgres extends ICrud {
    constructor(){
        super()
        this._driver=null
        this._herois=null
        
      
    }

    async create(item){
        const { dataValues} = await this._herois.create(item)
        return dataValues 
    }

    async read(item = {}){
        return await this._herois.findAll({where : item ,raw:true })
        
    }

    async update(id,item){
        if(!id){
            throw Error("Impossivel atualizar um heroi sem ID")
        }
        //const [heroi] = await this._herois.findAll({where : id ,raw:true })
        return await this._herois.update(item, {where : {id:id}})
    }

    async delete(id){
        if(!id){
            throw Error("Impossivel atualizar um heroi sem ID")
        }
        //const [heroi] = await this._herois.findAll({where : id ,raw:true })
        return await this._herois.destroy({where : {id:id}})
    }
    async isConected(){
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error('Error DBConnect')
            return false
        }
    }
    //Privado com underline na frente
    async connect(){
        this._driver = new Sequelize(
            'heros',
            'carlos',
            'carlos',
            { 
                host:'192.168.99.100',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        )
        await this.defineMode()
    }

    async defineMode(){
        this._herois = this._driver.define('heros',
    {
        id : {
            type : Sequelize.INTEGER,
            required:true,
            primaryKey: true,
            autoIncrement: true
        },
        nome : {
            type: Sequelize.STRING,
            required:true
        },
        poder : {
            type: Sequelize.STRING,
            required:true
        }
    },{
        tableName : 'TB_HEROIS',
        freezeTableName : false,
        timestamps:false
    })

    await this._herois.sync()
    }
    

}
module.exports = Postgres