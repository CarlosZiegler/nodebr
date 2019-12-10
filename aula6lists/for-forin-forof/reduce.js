
//Desestruturacao
const { obterPessoas } = require('./service')


Array.prototype.meuReduce = function (callback, valorInicial) {
    let valorFinal = typeof valorInicial !== undefined ? valorInicial : this[0]
    for (let index = 0; index <= this.length - 1; index++) {
        valorFinal = callback(valorFinal, this[index], this)
    }
    return valorFinal
}

async function mainReducer() {
    try {
        const {results} = await obterPessoas('a')
        const pesos = results.map((item)=>{
            return parseInt(item.height)
        })
        const total = pesos.reduce((prev, next)=>{
            return prev + next
        })
        console.log(total)
    } catch (error) {
        console.error('Error', error)
    }
}

mainReducer()

async function mainMyReducer() {
    try {
        
        const minhaLista = [
            ['Erick', 'Wendel'],
            ['NodeBR', 'Nerdzão']
        ]
        const total = minhaLista.meuReduce((anterior, proximo) => {
                return anterior.concat(proximo)
            }, [])
            .join(', ')
        console.log('total', total)

    } catch (error) {
        console.error('Error', error)
    }
}

mainMyReducer()
