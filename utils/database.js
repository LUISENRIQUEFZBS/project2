const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = 'mongodb+srv://santaaparicioc:Incorrect@cluster0.9o6gj.mongodb.net/';

const client = new MongoClient(uri);
const database = client.db('samsung');


module.exports = database;