const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejs',
    password: '12345678'
});

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = process.env.DB_URI;

const client = new MongoClient(uri);
const database = client.db('samsung');


module.exports = database;