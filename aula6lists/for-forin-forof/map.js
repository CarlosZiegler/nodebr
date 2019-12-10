const service = require('./service')

//implementacao de um MAP, como ele realmente funciona
Array.prototype.meuMap = (callback)=>{
    const novoArrayMapeado =[]
    for (let index = 0; index < this.length ; index++) {
        const resultado = callback(this[index], index);
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}

async function mainForeach() {
    try {
        const results = await service.obterPessoas('a')
        const names = []
        results.results.forEach(element => {
            names.push(element.name)
        });       
        console.log('names', names)
    } catch (error) {
        console.error('Error', error)
    }
}

mainForeach()
// Map nao precisa de uma variavel externa para guardar as informacoes, ele retorna um array
async function mainMap() {
    try {
        const results = await service.obterPessoas('a')
        const names = results.results.map((element)=>{
            return element.name
        })
        console.log('names', names)
    } catch (error) {
        console.error('Error', error)
    }
}

mainMap()

async function mainProprioMap() {
    try {
        const results = await service.obterPessoas('a')
        const names = results.results.meuMap((element, index)=>{
            return element.name
        })
        console.log('names', names)
    } catch (error) {
        console.error('Error', error)
    }
}

mainProprioMap()