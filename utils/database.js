const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = process.env.DB_URI;

const client = new MongoClient(uri);
const database = client.db('samsung');


module.exports = database;