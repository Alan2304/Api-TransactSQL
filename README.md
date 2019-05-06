# API using Transact-SQL

## Project Setup
* Install Dependencies
```
npm install
```
* Change the database configuration in db.js
```javascript 
const config = {
    user: 'DB_USER',
    password: 'DB_PASSWORD',
    server: 'SERVER\\SQLEXPRESS',
    database: 'AdventureWorks2012',
}
```

* Start the web server
```
npm start
```

## Observations
* If you only install the Microsoft SQL Management studio, you need to create another user
* Enable the connection with SQL Authentication
* If you are on windows go to services and enable SQL Server Browser
* If you are on windows go to Computer Management > Services And Applications > SQL Server Network Configuration > Enable TCP/IP