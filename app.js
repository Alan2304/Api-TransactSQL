const express = require('express');
const bodyParse = require('body-parser');
const sql = require('mssql');

var app = express();

app.use(bodyParse.json());

app.get('/', (req, res) => {
    res.send("Server Working");
});

app.listen(3000, () => {
    console.log('Start listen on Port 3000');
});