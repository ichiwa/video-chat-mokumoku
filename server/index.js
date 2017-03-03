// Dependencies
const express = require('express');
const createHttpServer = require('http').createServer;
const createIo = require('socket.io');
const createPeerServer = require('peer').ExpressPeerServer;

// Environment
const port = 9000;

// Routes
const app = express();
const httpServer = createHttpServer(app);
const io = createIo(httpServer);
const peerServer = createPeerServer(httpServer);

app.use('/peerjs', peerServer);
app.use(express.static(__dirname));

// Boot
httpServer.listen(port, () => {
  console.log(`Boot on http://localhost:${port}`);
});

peerServer.on('connection', function(id) { 
  console.log('connected', id);
  io.emit('connected', id);
});

peerServer.on('disconnect', (id) => {
  console.log('disconnect', id);
  io.emit('disconnected', id);
});

