/**
 * 1- Obter um usuario,
 * 2 Obter numero de telefone do usuarioa
 * 3 obter endereco do usuario
 * 
 */


function obterUsuario() {
    return new Promise((resolve, reject)=>{
        setTimeout(function()  {
            return resolve({
                id: 1,
                nome: 'Aladim',
                datanascimento: new Date()
            })
        }, 1000)
    })
    
}
// callback é o Ultimo parametro
function obterTelefone(idUsuario) {
    return new Promise((resolve, reject)=>{
        setTimeout(() =>{
            return resolve({
                numero:'0172 757 2563',
                ddd:30
            })
        }, 2000)
    })
    
}

// callback é o Ultimo parametro
function obterEndereco(idUsuario) {
    return new Promise((resolve, reject)=>{
        setTimeout(() =>{
            return resolve({
                rua:'Hofzeichendamm 43',
                cep:13125
            })
        }, 3000)
    })
   
}

async function main() {
    try {
        console.time('medida-promise')
        const usuario =  await obterUsuario()
        //const telefone = await obterTelefone()
        //const endereco = await obterEndereco()
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
            ]
        )
        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd})${telefone.numero},
            Endereco: ${endereco.rua}, ${endereco.cep}
            `)
            console.timeEnd('medida-promise')
    } catch (error) {
        console.error('Error', error)
    }
}
main()