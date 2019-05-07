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
    try {
        let products = req.body.products;
        let body = req.body;
        let dbProducts = [];
        for (let product of products) {
            dbProducts.push(await db.getProduct(product.ProductId));
        }
        //db.createOrderHeader(body.CustomerID);
        db.createOrderHeader(body.CustomerID).then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);
        });
        
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log('Start listen on Port 3000');
});