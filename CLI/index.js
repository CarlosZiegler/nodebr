const Commander = require("commander")
const Database = require("./database")
const Heroi = require("./heroi")
async function main(){
    Commander
    .version('v1')
    .option('-n, --nome [value]', "Nome do Heroi")
    .option('-p, --poder [value]', "Poder do Heroi")
    .option('-i, --id [value]', "Id do Heroi")
    .option('-c, --cadastrar', "Cadastrar um Heroi")
    .option('-l, --listar', "Listar Herois")
    .option('-f, --find ', "Listar um Heroi pelo ID")
    .option('-u, --update', "Atualizar Heroi")
    .option('-d, --delete', "Delete Heroi")
    .parse(process.argv)

    const heroi = new Heroi(Commander)
    const id = parseInt(Commander.id)
   
    
    try {
        
        if (Commander.cadastrar) {
            const resultado = await Database.cadastrarDados(heroi)
            if (!resultado) {
                console.error('Heroi nao foi Cadastrado')
                return
            }
            console.log('Heroi cadastrado com Sucesso!')
        }

        if (Commander.listar) {
            const resultado = await Database.listar()
            if (!resultado) {
                console.error('Nenhum Heroi existente')
                return
            }
            console.log(resultado)
        }

        if (Commander.find) {
            const resultado = await Database.listar(id)
            if (!resultado) {
                console.error('Nenhum Heroi existente')
                return
            }
            console.log(resultado)
        }

        if (Commander.update) {
            
            const resultado = await Database.update(id, heroi)
            
            if (!resultado) {
                console.error('Nenhum Heroi existente')
                return
            }
            console.log(resultado)
        }
        if (Commander.delete) {
            
            const resultado = await Database.remover(id)
            
            if (!resultado) {
                console.error('Nenhum Heroi existente')
                return
            }
            console.log("heroi Deletado")
        }
    } catch (error) {
        console.error("Error", error)
    }




}

main()