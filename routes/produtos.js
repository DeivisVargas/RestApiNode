const express   = require('express') ;
const router    = express.Router();
const mysql     = require('../mysql').conect;

//RETORNA TODOS PRODUTOS
router.get('/' ,(req , res , next) =>{
    
    mysql.getConnection((error , conn) =>{    
        if(error){
            return res.status(500).send({
                error       : error 
            });
        }
        conn.query(
            'SELECT * from  produtos ',
            (error , result , field) =>{
                conn.release(); // liberamdo conexaoes ja existentes

                if(error){
                    return res.status(500).send({
                        error       : error ,
                        response    : NULL
                    });
                }

                res.status(201).send({
                    mensagem        :"Buscando todos produtos" ,
                    response        : result
                });
            }
        )
    });

    //res.status(200).send({
     //   mensagem:"usando get na rota de produtos" 
    //});
});

//CONSULTA PRODUTO POR ID
router.get('/:id_produto' ,(req , res , next) =>{
    const id = req.params.id_produto ;

    mysql.getConnection((error , conn) =>{    
        if(error){
            return res.status(500).send({
                error       : error 
            });
        }
        conn.query(
            'SELECT * from  produtos where id_produtos = ? ',
            [id],
            (error , result , field) =>{
                conn.release(); // liberamdo conexaoes ja existentes

                if(error){
                    return res.status(500).send({
                        error       : error ,
                        response    : NULL
                    });
                }

                res.status(201).send({
                    mensagem        :"Buscando todos produtos" ,
                    response        : result
                });
            }
        )
    });
    
});

//INSERE PRODUTOS
router.post('/' ,(req , res , next) =>{
    const produto = {
        nome  : req.body.nome , 
        preco : req.body.preco ,
    } ;

    mysql.getConnection((error , conn) =>{
        if(error){
            return res.status(500).send({
                error       : error 
            });
        }
        conn.query(
            'INSERT INTO produtos (nome , preco) values(? , ?)',
            [produto.nome , produto.preco] ,
            (error , result , field) =>{
                conn.release(); // liberamdo conexaoes ja existentes

                if(error){
                    return res.status(500).send({
                        error       : error ,
                        response    : NULL
                    });
                }

                res.status(201).send({
                    mensagem        :"Produto inserido com sucesso" ,
                    id_produto     : result.insertId
                });
            }
        )
    });

    
});

//ALTERA PRODUTOS
router.patch('/' ,(req , res , next) =>{
    const produto = {
        nome        : req.body.nome , 
        preco       : req.body.preco ,
        id_produto  : req.body.id_produto
    } ;

    mysql.getConnection((error , conn) =>{
        if(error){
            return res.status(500).send({
                error       : error 
            });
        }
        conn.query(
            `UPDATE   produtos
                set nome        = ? ,
                preco           = ? 
             where id_produtos  = ? 
            `,
            [   produto.nome , 
                produto.preco,
                produto.id_produto
            ],
            (error , result , field) =>{
                conn.release(); // liberamdo conexaoes ja existentes
                if(error){
                    return res.status(500).send({
                        error       : error ,
                        response    : NULL
                    });
                }
                res.status(202).send({mensagem :"Produto alterado com sucesso" });
            }
        )
    });
});

//DELETA UM PRODUTO
router.delete('/' ,(req , res , next) =>{
    const produto = {
        id_produto  : req.body.id_produto
    } ;

    mysql.getConnection((error , conn) =>{
        if(error){
            return res.status(500).send({
                error       : error 
            });
        }
        conn.query(
            " DELETE from   produtos  where id_produtos  = ? ",
            [ produto.id_produto],
            (error , result , field) =>{
                conn.release(); // liberamdo conexaoes ja existentes
                if(error){
                    return res.status(500).send({
                        error       : error ,
                        response    : NULL
                    });
                }
                res.status(202).send({mensagem :"Produto deletado com sucesso" });
            }
        )
    });
});

module.exports = router ; 