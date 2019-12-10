/**
 * 1- Obter um usuario,
 * 2 Obter numero de telefone do usuarioa
 * 3 obter endereco do usuario
 * 
 */


function obterUsuario(callback) {
    setTimeout(function()  {
        return callback(null, {
            id: 1,
            nome: 'Aladim',
            datanascimento: new Date()
        })
    }, 1000)
}
// callback é o Ultimo parametro
function obterTelefone(idUsuario, callback) {
    setTimeout(() =>{
        return callback(null, {
            numero:'0172 757 2563',
            ddd:30
        })
    }, 2000)
}

// callback é o Ultimo parametro
function obterEndereco(idUsuario, callback) {
    setTimeout(() =>{
        return callback(null, {
            rua:'Hofzeichendamm 43',
            cep:13125
        })
    }, 3000)
}

// Bloco sincroniza as funcoes. Chama a funcao, depois seu callcack
obterUsuario(function resolverUsuario(error, usuario) {
    // null  or "" or 0 is FALSE
    if (error) {
        console.error('Error User', error)
        return;
    }
    
    obterTelefone( usuario.id,function resolverTelefone(error1, telefone) {
        if (error1) {
            console.error('Error Telefone', error)
            return;
        }
        
        obterEndereco( usuario.id,function resolverEndereco(error2, endereco) {
            if (error1) {
                console.error('Error Endereco', error)
                return;
            }
            console.log(`
            Nome: ${usuario.nome}
            Endereco : ${endereco.rua}, ${endereco.cep}
            Telefone : (${telefone.ddd})${telefone.numero}
            `)
            
        })
        
    })
})




