/* =============================================================================
 * EECE/CS 3093C Software Engineering — Lab 1
 * client.js — code skeleton provided by Dr. Phu Phung
 * Code complete implementation by Hinna Parwez
 * =============================================================================
 */

var socket = io(); // connect to the Socket.io server

socket.on("connect", () => {
  console.log(`Connected to Socket.io server:
    ${socket.io.opts.hostname}, port: ${socket.io.opts.port}`);
});

// UI DOM references
var sendBtnElm = document.getElementById('send-button');
var chatMessageInput = document.getElementById('chat-message');

if (!sendBtnElm) {
  console.log("Error in getting 'send-button' button");
}

if (!chatMessageInput) {
  console.log('Error in getting "chat-message" input');
}

// Send button click triggers sendMessage()
sendBtnElm.addEventListener('click', sendMessage);

// Pressing Enter also triggers sendMessage()
chatMessageInput.addEventListener('keypress', function(e) {
  socket.emit('typing');

  if (e.key === 'Enter') {
    sendMessage();
  }
});

// =============================================================================
// Use-Case-01: Send Message
// =============================================================================

function sendMessage() {
  var message = chatMessageInput.value.trim();

  if (!message) return; // empty messages are ignored

  console.log(`Debug>Chat message: ${message}`);

  socket.emit("message", message);

  chatMessageInput.value = '';
  chatMessageInput.focus();
}

// =============================================================================
// Use-Case-02: Receive Message
// =============================================================================

socket.on("message", (data) => {
  displayMessage(data);
});

function displayMessage(data) {
  var responseElm = document.getElementById("chat-responses");
  var d = document.createElement("div");
  var timestamp = new Date().toLocaleTimeString();

  d.innerHTML = '<span style="color: #2431e5">[' + timestamp + ']</span> '
    + DOMPurify.sanitize(data);

  responseElm.appendChild(d);
  responseElm.scrollTop = responseElm.scrollHeight;
}

// Display system status events
socket.on("status", (data) => {
  var statusElm = document.getElementById("system-status");
  var timestamp = new Date().toLocaleTimeString();

  statusElm.innerHTML = statusElm.innerHTML +
    '<br><span style="color: #2ee524">[' + timestamp + ']</span> ' +
    DOMPurify.sanitize(data);

  statusElm.scrollTop = statusElm.scrollHeight;
});
