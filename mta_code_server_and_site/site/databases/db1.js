// LIBLARY

const mysql = require('mysql');

// WEB DB

var getHost = "WRITEHOST" // Write your host ip
var getUser = "WRITEUSER" // Write your username
var getPassword = "WRITEPASSWD" // Write your password
var getDB = "WRITEWEBDB" // Write your web db

exports.db1 = mysql.createConnection({
    host: getHost, 
    user: getUser, 
    password: getPassword, 
    database: getDB 
});