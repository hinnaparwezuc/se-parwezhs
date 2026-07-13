// =============================================================================
// EECE/CS 3093C Software Engineering — Lab 3
// messengerdb.js — code skeleton provided by Phu Phung
// complete implementation by Hinna Parwez
// =============================================================================

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = "mongodb+srv://parwezhs:Cocotommy@messengerdb.kixeioi.mongodb.net/?retryWrites=true&w=majority&appName=MessengerDB";
const client = new MongoClient(uri);

let users;

// Connect to MongoDB Atlas
async function connect() {
    await client.connect();

    users = client.db('messenger').collection('users');

    console.log('Debug>messengerdb.js: connected to MongoDB server!');
}

// Use-Case-03: Join Chat
async function find(username, password) {

    console.log(
        `Debug>messengerdb.js: find user '${username}'`
    );

    // Defense in depth: reject non-string input
    if (
        typeof username !== 'string' ||
        typeof password !== 'string'
    ) {
        return null;
    }

    // Look up the user by username only
    const user = await users.findOne({
        username: username
    });

    if (!user) {
        return null;
    }

    // Compare the entered password with the stored bcrypt hash
    const passwordMatches = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatches) {
        return null;
    }

    return user;
}

// Use-Case-05: Register Account
async function register(username, password) {
    console.log(
        `Debug>messengerdb.js: register username '${username}'`
    );

    // Data layer independently validates input
    const usernamePattern = /^\w{3,20}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (
        !usernamePattern.test(username) ||
        !passwordPattern.test(password)
    ) {
        return {
            success: false,
            message: 'Invalid username or password format.'
        };
    }

    // Check whether username already exists
    const existing = await users.findOne({
        username: username
    });

    if (existing) {
        return {
            success: false,
            message: 'Username already exists.'
        };
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
        username: username,
        password: hashedPassword
    });

    return {
        success: true
    };
}


module.exports = {
    connect,
    find,
    register
};
