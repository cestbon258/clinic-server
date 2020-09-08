// import mysql module
var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'clinic_db',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock', // enable this line if using MAMP
	port: '3306'
});

// export as a module
module.exports = connection;
