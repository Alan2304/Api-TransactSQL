const sql = require('mssql');
const config = {
    user: 'DB_USER',
    password: 'DB_PASSWORD',
    server: 'SERVER\\SQLEXPRESS', // You can use 'localhost\\instance' to connect to named instance
    database: 'AdventureWorks2012',
}

const db = new sql.ConnectionPool(config).connect();

// const execute = async () => {
//     let database = await db;
//     //const pool = await new ConnectionPool(config).connect();
//     let result = await database.request().query('SELECT * FROM Person.Person');
    
//     console.dir(result);
//     database.close();
// }


