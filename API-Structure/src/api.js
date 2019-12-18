//npm install hapi
//import hapi
const Hapi = require('hapi')

//Import Data from Database
const Context = require('./db/strategies/base/ContextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HerouRoute = require('./routes/heroRoutes')

//import Plugins for a Documentation
const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')

//new APP
const app = new Hapi.Server({
    port:5000
})

//List all Methods from a Instance
function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    //new Connection
    const connection = Mongodb.connect()
    //New Context with connection and Schema
    const context = new Context(new Mongodb(connection, HeroiSchema))
    //options for a Swaggger Plugin
    const sawaggerOptions = {
        info: {
            title: 'API Herois',
            version: 'V1.0'
        }
    }

    //register Plugins for a Documentation
    await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: sawaggerOptions
        }
    ])

    //Mapping Methods from Class HeruRoute with Instance and a Result from Static Methode BaseRoute
    app.route(
        mapRoutes(new HerouRoute(context), HerouRoute.methods())
    )

    


    //Start Server
    await app.start()
    console.log('Servidor rodando', app.info.port)

    return app
}
module.exports = main()