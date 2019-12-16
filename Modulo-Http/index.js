const http = require('http')

http.createServer((request,response) =>{
    response.end('Hello NodeJS')
})
.listen(5000,()=>{console.log('Servidor Rodando')})
