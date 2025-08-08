const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { setupSocketHandlers } = require('./handlers/socketHandlers');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

setupSocketHandlers(io);

server.listen(3000, () => {
    console.log('Server running on port 3000');
});