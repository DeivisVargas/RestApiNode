const express   = require('express') ;
const router    = express.Router();

//RETORNA TODOS PEDIDOS
router.get('/' ,(req , res , next) =>{
    res.status(200).send({
        mensagem:"usando get na rota de pedidos" 
    });
});

//CONSULTA PEDIDO POR ID
router.get('/:id_pedido' ,(req , res , next) =>{
    const id = req.params.id_pedido ;

    res.status(200).send({
        mensagem:"usando get id  do pedidos",
        id_pedido : id
    });
    
    
});

//INSERE PEDIDOS NO BANCO
router.post('/' ,(req , res , next) =>{
    const pedido = {
        id_produto  : req.body.id_produto , 
        qtdProduto  : req.body.qtdProduto ,
    } ;

    res.status(201).send({
        mensagem:"usando POST na rota de pedidos" ,
        pedidoCriado : pedido
    });
});

//DELETA UM PEDIDO
router.delete('/' ,(req , res , next) =>{
    res.status(201).send({
        mensagem:"usando delete na rota de pedidos" 
    });
});

module.exports = router ; 