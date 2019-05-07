const express = require('express');
const bodyParse = require('body-parser');
const sql = require('mssql');
const db = require('./db');
const moment = require('moment');

var app = express();

app.use(bodyParse.json());

app.get('/listProducts', (req, res) => {
    res.send("Server Working");
});

app.post('/listProducts', async (req, res) => {
    let products = req.body.products;
    let body = req.body;
    let dbProducts = [];
    for (let product of products) {
        dbProducts.push(await db.getProduct(product.ProductId));
    }
    const transaction = new sql.Transaction(await db.db.connect());
    transaction.begin(err => {
        let rolledBack = false;
        transaction.on('rollback', aborted => {
            rolledBack = true
        })
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
        ,${body.CustomerID}
        ,1
        ,1
        ,1);
        SELECT SCOPE_IDENTITY() AS id;
        `
        new sql.Request(transaction).query(query, (err, result) => {
            if (err) {
                if (!rolledBack) {
                    transaction.rollback(err => {
                        console.log(err);
                    })
                }
            } else {
                transaction.commit(err => {
                    console.log(result.recordset[0].id);
                })
            }
        });
    });
});

app.listen(3000, () => {
    console.log('Start listen on Port 3000');
});