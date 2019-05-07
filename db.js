const sql = require('mssql');
const config = {
    user: 'ApiUser',
    password: 'Chocolate12',
    server: 'LAPTOP-T6RDF3NF\\SQLEXPRESS',
    database: 'AdventureWorks2012',
}
const db = new sql.ConnectionPool(config);
var helper = {
    idOrderHeader: null
}
// const execute = async () => {
//     let database = await db;
//     //const pool = await new ConnectionPool(config).connect();
//     let result = await database.request().query('SELECT * FROM Person.Person');
    
//     console.dir(result);
//     database.close();
// }

const getProduct = async (productID) => {
    let database = await db.connect();
    let result = await database.request().query(`SELECT * FROM Production.Product WHERE ProductID=${productID}`);
    database.close();
    return result.recordset[0];
}

const createOrderHeader = async (customerId) => {
    return transactionProm(customerId);
}

const transactionProm =async (customerId) => {
    let database = await db.connect();
    const transaction = new sql.Transaction(database);
    let rolledBack = false;
    return new Promise((resolve, reject) => {
        transaction.begin(err => {
            transaction.on('rollback', aborted => {
                rolledBack = true;
            });
    
            let query = `INSERT INTO [Sales].[SalesOrderHeader]
                ([RevisionNumber]
                ,[OrderDate]
                ,[DueDate]
                ,[Status]
                ,[CustomerID]
                ,[BillToAddressID]
                ,[ShipToAddressID]
                ,[ShipMethodID])
                VALUES
                    (8
                    ,GETDATE()
                    ,DATEADD(DAY, 7, GETDATE())
                    ,1
                    ,${customerId}
                    ,1
                    ,1
                    ,1);
                    SELECT SCOPE_IDENTITY() AS id;`
    
            new sql.Request(transaction).query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    })
}

const getHelper = () => {
    return helper;
}

module.exports = {
    db,
    getProduct,
    createOrderHeader,
    getHelper
}

