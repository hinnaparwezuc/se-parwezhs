// =============================================================================
// EECE/CS 3093C Software Engineering — Lab 1
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

// AC-02.6 (Security): CSP header — browser-level defense-in-depth
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://cdnjs.cloudflare.com"
  );
  next();
});

app.use(express.static(path.join(__dirname, 'ui')));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('Server running on port ' + PORT));

// In-memory store: socketId → username
const userlist = new Map();

io.on('connection', (socket) => {
  const username = 'User_' + socket.id.slice(-5);
  userlist.set(socket.id, username);

  console.log('New client connected - socket ID: ' + socket.id);

  io.emit('status', username + ' joined the chat');

  socket.on('message', (data) => {
    if (typeof data !== 'string' || data.trim() === '') return;

    io.emit('message', username + ': ' + data.trim());
  });
socket.on('typing', () => {
  socket.broadcast.emit('status', username + ' is typing...');
  console.log(username + ' is typing...');
});
  socket.on('disconnect', () => {
    const username = userlist.get(socket.id);
    userlist.delete(socket.id);

    console.log('Client disconnected - socket ID: ' + socket.id);

    io.emit('status', username + ' left the chat');
  });
});