var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: process.env.PORT, path: '/peerjs'});
