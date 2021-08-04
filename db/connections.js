const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'notyourdad',
  database: 'riverside',
});

module.exports = db;
