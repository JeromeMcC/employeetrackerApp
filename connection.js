const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password:"", 
      database: 'company_db'
    },
    console.log(`company_db database accessed.`)
  );

  db.connect(function (err){
    if (err) throw err;
  })

  module.exports=db