/* =============================================================================
 * EECE/CS 3093C Software Engineering — Lab 2
 * client.js — code skeleton provided by Dr. Phu Phung
 * Messanget with Basic Authentication
 * Code complete implementation by Hinna Parwez
 * =============================================================================
 */

var socket = io(); // connect to the Socket.io server

socket.on('connect', function () {
  console.log(
    'Connected to Socket.io server: ' +
    socket.io.opts.hostname +
    ', port: ' +
    socket.io.opts.port
  );
});


// UI DOM references

var loginUI = document.getElementById('loginUI');
var chatUI = document.getElementById('chatUI');

var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var joinButton = document.getElementById('join-button');
var loginError = document.getElementById('login-error');

var loggedInUser = document.getElementById('logged-in-user');
var userListElm = document.getElementById('user-list');
var logoutButton = document.getElementById('logout-button');

var sendButton = document.getElementById('send-button');
var chatMessageInput = document.getElementById('chat-message');
var chatResponses = document.getElementById('chat-responses');
var systemStatus = document.getElementById('system-status');

// Use-Case-03 Join Chat

joinButton.addEventListener('click', joinChat);

usernameInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    joinChat();
  }
});

passwordInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    joinChat();
  }
});

function joinChat() {
  var username = usernameInput.value.trim();
  var password = passwordInput.value;

  loginError.textContent = '';

  // AC-03.1: client-side input validation
  if (!username || !password) {
    loginError.textContent = 'Username and password are required.';
    passwordInput.value = '';
    return;
  }

  var credentials = {
    username: username,
    password: password
  };

  console.log('Debug> Sending join request for username: ' + username);

  socket.emit('join', credentials);
}

// AC - 03.5 AND AC-03.6: successful authentication
socket.on('join-success', function (data) {
  var username;

  if (typeof data === 'object' && data !== null) {
    username = data.username;
  } else {
    username = data;
  }

  loggedInUser.textContent = username || usernameInput.value.trim();

  loginError.textContent = '';
  passwordInput.value = '';

  loginUI.style.display = 'none';
  chatUI.style.display = 'block';

  chatMessageInput.focus();
});

// AC-03.3 and AC-03.4: invalid credentials or malformed request
socket.on('join-error', function (message) {
  loginError.textContent =
    typeof message === 'string'
      ? message
      : 'Invalid username or password.';

  passwordInput.value = '';
  passwordInput.focus();
});

// AC-03.7: display authenticated users
socket.on('user-list', function (users) {
  if (!Array.isArray(users)) {
    userListElm.textContent = '[]';
    return;
  }

  userListElm.textContent = JSON.stringify(users);
});

// Use-Case-01: Send Message

sendButton.addEventListener('click', sendMessage);

chatMessageInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  var message = chatMessageInput.value.trim();

  // AC-01.2: ignore empty messages
  if (!message) {
    return;
  }

  console.log('Debug> Chat message: ' + message);

  socket.emit('message', message);

  chatMessageInput.value = '';
  chatMessageInput.focus();
}

// UC-04: server rejected an unauthenticated action
socket.on('not-authorized', function () {
  displayStatus('This connection has not been authenticated.');
});

// Use-Case-02: Receive Message

socket.on('message', function (data) {
  displayMessage(data);
});

function displayMessage(data) {
  var messageElement = document.createElement('div');
  var timestamp = new Date().toLocaleTimeString();

  messageElement.innerHTML =
    '<span style="color: #2431e5">[' +
    timestamp +
    ']</span> ' +
    DOMPurify.sanitize(String(data));

  chatResponses.appendChild(messageElement);
  chatResponses.scrollTop = chatResponses.scrollHeight;
}

// System status

socket.on('status', function (data) {
  displayStatus(data);
});

function displayStatus(data) {
  var statusElement = document.createElement('div');
  var timestamp = new Date().toLocaleTimeString();

  statusElement.innerHTML =
    '<span style="color: #2ee524">[' +
    timestamp +
    ']</span> ' +
    DOMPurify.sanitize(String(data));

  systemStatus.appendChild(statusElement);
  systemStatus.scrollTop = systemStatus.scrollHeight;
}

// Logout

logoutButton.addEventListener('click', function () {
  socket.disconnect();
  window.location.reload();
});
