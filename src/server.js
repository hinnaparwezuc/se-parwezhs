// =============================================================================
// EECE/CS 3093C Software Engineering — Lab 2
// server.js — code skeleton provided by Phu Phung
// complete implementation by Hinna Parwez
// =============================================================================
const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const path       = require('path');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

// Browser security header retained from Lab 1
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; " +
    "style-src 'self' 'unsafe-inline'; connect-src 'self'"
  );
  next();
});

app.use(express.static(path.join(__dirname, 'ui')));

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

// =============================================================================
// Use-Case-03: Join Chat
// Temporary hard-coded credential store for Lab 2
// =============================================================================

const users = [
  { username: 'hinna', password: 'Pass1234' },
  { username: 'alex', password: 'Pass5678' },
  { username: 'test', password: 'Pass9012' }
];

// Stores only authenticated users:
// socket ID username
const userlist = new Map();

// Use-Case-04: Authorize User

function authorizeUser(socket) {
  if (!socket || socket.authenticated !== true) {
    console.log('Connection has not been authenticated');
    return false;
  }

  return true;
}

// Send an event only to authenticated clients
function sendToAuthenticatedClients(event, data) {
  userlist.forEach((username, socketId) => {
    const authenticatedSocket = io.sockets.sockets.get(socketId);

    if (
      authenticatedSocket &&
      authorizeUser(authenticatedSocket)
    ) {
      authenticatedSocket.emit(event, data);
    }
  });
}

// Send the updated authenticated user list
function sendUserList() {
  const authenticatedUsers = Array.from(userlist.values());

  sendToAuthenticatedClients(
    'user-list',
    authenticatedUsers
  );
}

// Socket.io connection

io.on('connection', (socket) => {
  console.log(
    'New client connected - socket ID: ' +
    socket.id
  );

  // Every new connection starts unauthenticated
  socket.authenticated = false;
  socket.username = null;

  // Use-Case-03: Join Chat

  socket.on('join', (credentials) => {
    console.log(
      'Debug> Join request received from socket: ' +
      socket.id
    );

    // AC-03.2: validate JSON payload structure
    if (
      !credentials ||
      typeof credentials !== 'object' ||
      typeof credentials.username !== 'string' ||
      typeof credentials.password !== 'string'
    ) {
      socket.emit(
        'join-error',
        'Invalid login request.'
      );
      return;
    }

    const username = credentials.username.trim();
    const password = credentials.password;

    if (!username || !password) {
      socket.emit(
        'join-error',
        'Username and password are required.'
      );
      return;
    }

    // AC-03.3: look up submitted credentials
    const matchingUser = users.find((user) => {
      return (
        user.username === username &&
        user.password === password
      );
    });

    // AC-03.4: generic error for invalid credentials
    if (!matchingUser) {
      console.log(
        'Debug> Invalid credentials for socket: ' +
        socket.id
      );

      socket.emit(
        'join-error',
        'Invalid username or password.'
      );
      return;
    }

    // AC-03.5: establish authenticated state
    socket.authenticated = true;
    socket.username = matchingUser.username;

    userlist.set(
      socket.id,
      matchingUser.username
    );

    console.log(
      'Debug> User authenticated: ' +
      matchingUser.username
    );

    // AC-03.6: tell this client login succeeded
    socket.emit('join-success', {
      username: matchingUser.username
    });

    // AC-03.7: notify authenticated users
    sendToAuthenticatedClients(
      'status',
      matchingUser.username +
      ' joined the chat. Number of connected clients: ' +
      userlist.size
    );

    sendUserList();
  });

  // Use-Case-01: Send Message

  socket.on('message', (data) => {
    console.log(
      'Debug> received a chat message: ' +
      data
    );

    // Include UC-04: Authorize User
    if (!authorizeUser(socket)) {
      socket.emit('not-authorized');
      return;
    }

    // Ignore invalid or empty messages
    if (
      typeof data !== 'string' ||
      data.trim() === ''
    ) {
      return;
    }

    const sender = userlist.get(socket.id);

    console.log(
      'Debug> "' +
      sender +
      '" sent: ' +
      data.trim()
    );

    // Send only to authenticated clients
    sendToAuthenticatedClients(
      'message',
      sender + ' says: ' + data.trim()
    );
  });

  // Disconnect
  
  socket.on('disconnect', () => {
    const username = userlist.get(socket.id);

    userlist.delete(socket.id);

    console.log(
      'Client disconnected - socket ID: ' +
      socket.id
    );

    // Only announce users who had authenticated
    if (username) {
      sendToAuthenticatedClients(
        'status',
        username +
        ' left the chat. Number of connected clients: ' +
        userlist.size
      );

      sendUserList();
    }
  });
});