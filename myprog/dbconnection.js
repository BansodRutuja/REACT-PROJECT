const {createConnection} =require('mysql2');
const mysql = require('mysql2/promise');

const credentials = {
    host : 'localhost',
    user : 'root',
    password :'SQL123',
    database:'myerpdb'
}

//
const myDBconnection = async ()=>{
    return mysql.createConnection(credentials);
};

module.exports = myDBconnection;