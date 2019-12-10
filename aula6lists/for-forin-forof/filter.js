//Desestruturacao
const { obterPessoas } = require('./service')

Array.prototype.meuFilter = function (callback) {
    const lista = []
    for (index in this) {
        const item = this[index]
        const result = callback(item, index, this)
        // 0, "", null, undefined === false
        if (!result) continue;
        lista.push(item)
    }
    return lista;
}



async function mainFilter() {
    try {
        const {results} = await obterPessoas('a')
        const familiaLars = results.filter((element)=>{
            //retorna um booleano, se manem ou nao na lista
            const result = element.name.toLowerCase().indexOf('lars') !== -1
            return result
        })
        const names = familiaLars.map((element)=>{
            return element.name
        })
        console.log('names', names)
    } catch (error) {
        console.error('Error', error)
    }
}
mainFilter()


async function main() {
    try {
        const {
            results
        } = await obterPessoas(`a`)

        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)

    } catch (error) {
        console.error('DEU RUIM', error)
    }

}
main()
