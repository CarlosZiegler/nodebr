const axios = require('axios')
const URL = 'https://swapi.co/api/people'

async function obterPessoas(nome) {
    const url= `${URL}/?search=${nome}&format=json`
    const responde = await axios.get( url )
    return responde.data
}

obterPessoas('r2')
    .then((result)=>{
        console.log('result', result)
    })
    .catch((error)=>{
        console.error('Error in Axios', error)
    })