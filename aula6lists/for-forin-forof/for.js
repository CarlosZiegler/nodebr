const service = require('./service')

async function mainFor() {
    try {
        const result = await service.obterPessoas('a')
        const names = []
        console.time('for')
        for (let index = 0; index < result.results.length -1; index++) {
            const element = result.results[index];
            names.push(element.name)
            
        }
        console.timeEnd('for')
        console.log('names', names)
    } catch (error) {
        console.error('Error', error)
    }
}

mainFor()

async function mainForin() {
    try {
        const result = await service.obterPessoas('a')
        const names = []
        console.time('forin')
        for (const i in result.results) {
            if (result.results.hasOwnProperty(i)) {
                const element = result.results[i];
                names.push(element.name)
            }
        }
        console.timeEnd('forin')
        console.log('names', names)
    } catch (error) {
        console.error('Error', error)
    }
}

mainForin()


async function mainForof() {
    try {
        const result = await service.obterPessoas('a')
        const names = []
        console.time('forof')
        for (const element of result.results) {
            names.push(element.name)
        }
        console.timeEnd('forof')
        console.log('names', names)
    } catch (error) {
        console.error('Error', error)
    }
}

mainForof()