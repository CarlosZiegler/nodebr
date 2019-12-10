const Commander = require("commander")
const Database = require("./database")
const Heroi = require("./heroi")
async function main(){
    Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-c, --cadastrar', "Cadastrar um Heroi")
    .parse(process.argv)

    const heroi = new Heroi(Commander)
    
    try {
        
        if (Commander.cadastrar) {
            console.log(heroi)
            const resultado = await  Database.cadastrarDados(heroi)
        }
    } catch (error) {
        console.error("Error")
    }




}

main()