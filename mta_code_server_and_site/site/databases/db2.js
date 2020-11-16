// LIBLARY

const mysql = require('mysql');

// MTA DB

var getHost = "WRITEHOST" // Write your host ip
var getUser = "WRITEUSER" // Write your username
var getPassword = "WRITEPASSWD" // Write your password
var getDB = "WRITEMTADB" // Write your mta db

exports.db2 = mysql.createConnection({
    host: getHost, 
    user: getUser, 
    password: getPassword, 
    database: getDB  
});