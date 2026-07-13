// =============================================================================
// EECE/CS 3093C Software Engineering — Lab 3
// messengerdb.js — code skeleton provided by Phu Phung
// complete implementation by Hinna Parwez
// =============================================================================

const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let users;

// Connect to MongoDB Atlas
async function connect() {
    await client.connect();

    users = client
        .db('messenger')
        .collection('users');

    console.log('Debug>messengerdb.js: connected to MongoDB server!');
}

// Use-Case-03: Join Chat
// Check username and password against MongoDB
async function find(username, password) {
    console.log(
        `Debug>messengerdb.js: finding user '${username}'`
    );

    const user = await users.findOne({
        username: username,
        password: password
    });

    return user;
}

module.exports = {
    connect,
    find
};
