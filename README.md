# API using Transact-SQL

## Project Requirements
* Microsft SQL Management Studio
* SQL Server installed
* NodeJS +v10
* npm +6

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
* The products must be in the table special offer products or it will cause a exception
* The SQL Serer Authenticatio mode needs to be enabled