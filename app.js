const express       = require('express') ;
const app           = express();
//MORGAN BIBLIOTECA PARA MONITORAR REQUISICOES
const morgan        = require('morgan') ;
const bodyParser    = require('body-parser') ;



//ESTANCIA DOS OBJETOS DA PASTA ROTAS
const rotaProdutos  = require('./routes/produtos');
const rotaPedidos   = require('./routes/pedidos');

//CHAMANDO A BIBLIOTECA QUE MONITORA REQUISICOES
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));//apenas aceitar dados simples
app.use(bodyParser.json()); //somente vamos aceitar dados json de entrada 

//permissao para url acessao ,podendo ser ex "https//teste.com.br"  * permite todas 
//tratando cores
app.use((req , res , next) =>{
    res.header('Acces-Controle-Alow-Origin', '*');
    res.header(
        'Acces-Controle-Alow-Header', 
        'Origin , X-Requested-Width ,Content-Type , Accept, Authorization'
        
        );

    if(req.method === 'OPTIONS'){
        res.header('Access-Controle-Allow-Methods' , 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).send({});
    }
    
    next();
});

//chamando a rota de produtos
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);


//quando nao encontra a rota
app.use((req , res , next) =>{
    const erro = new Error('Rota invalida') ;
    erro.status= 404 ;
    next(erro);
    
});

//tratamento de rota invalida
app.use((error , req , res , next) =>{
    res.status(error.status || 500) ;
    return res.send({
        erro : {
            mensagem: error.message
        }
    });
    
});

module.exports = app ; 