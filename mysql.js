const mysql = require('mysql') ;


const conect = mysql.createPool({
    "user"      : process.env.MYSQL_USER ,
    "password"  : process.env.MYSQL_PASSWORD ,
    "database"  : process.env.MYSQL_DATABASE ,
    "host"      : process.env.MYSQL_HOST ,
    "port"      : process.env.MYSQL_PORT ,

});

/*
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Zubat43666@",
    database: "ecommerce",
    connectionLimit: 10,
    port        :3306
})


pool.query(`select * from produtos`, function(err, result, fields) {
    if (err) {
        return console.log(err);
    }
    return console.log(result);
});
*/



exports.conect = conect ;