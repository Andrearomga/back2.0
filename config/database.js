const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'root',            
  password: 'andrearoman', 
  database: 'flutterDB',   
  port: 3306               
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL: ' + err.stack);
    return;
  }
  console.log('Conectado a MySQL como id ' + connection.threadId);
});

module.exports = connection;
