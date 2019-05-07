const express = require('express');
const bodyParse = require('body-parser');
const sql = require('mssql');
const db = require('./db');

var app = express();

app.use(bodyParse.json());

app.get('/listProducts', (req, res) => {
    res.send("Server Working");
});

app.post('/listProducts', async (req, res) => {
    try {
        let products = req.body.products;
        let body = req.body;
        var idOrderHeader;

        //Create the order header
        db.createOrderHeader(body.CustomerID).then(async (result) => {
            idOrderHeader = result.recordset[0].id;
            console.log(result.recordset[0].id);

            //Create the order details
            for (let product of products) {
                console.log(await db.createOrderDetail(product.ProductId, product.quantity, idOrderHeader));
            }
            res.send({
                response: 'The transactions were succesfulled commited',
                idOrderHeader: idOrderHeader
            });

        }).catch((err) => {
            console.log(err);
            res.send({
                error: 'Error in the creation of the order'
            }, 500);
        });
        
    } catch (error) {
        res.send({
            error: 'Error in the database'
        })
    }
});

app.listen(3000, () => {
    console.log('Start listen on Port 3000');
});