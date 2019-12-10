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
            return {
                rua:'Hofzeichendamm 43',
                cep:13125
            }
        }, 3000)
    })
   
}

const usuarioPromisse = obterUsuario()
usuarioPromisse
    .then((usuario)=>{
        return obterTelefone(usuario.id)
        .then((result)=>{
            return {
               usuario: {
                   nome:usuario.nome,
                   id: usuario.id,
                   datanascimento: usuario.datanascimento
               },
               telefone: result            
            }
        }).then((resultado1)=>{
            return obterEndereco(resultado1.usuario.id)
            .then((resultado2)=>{
                return {
                    usuario:resultado1.usuario,
                    telefone:resultado1.telefone,
                    endereco:resultado2
                }
             })
        })
    })
    .then((resultadoFinal)=>{
        console.log(resultadoFinal)
    })
    .catch((error)=>{
        console.log('Error User',error)
    })
    
const enderecoPromisse = obterEndereco()
