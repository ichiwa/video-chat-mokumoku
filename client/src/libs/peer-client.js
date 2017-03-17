import Peer from 'peerjs';

export default class PeerClient {
  peer = {};
  peerId = null;
  myVideoElement = null;
  peerVideoElement = null;
  conn = null;
  username = 'test';
  socket = io();

  constructor() {
    this.socket.on('connect', function (id) {
      console.log('connected');
    });
    this.socket.on('connected', (id) => {
      if (this.peerId != id) {
        setTimeout(() => {
          this.connect({targetPeerId : id});
        }, 1500);
      }
    });
    this.peer = new Peer({
      host: process.env.PEERJS_SERVER_DOMAIN,
      port: 443,
      path: '/peerjs',
      debug: 3,
      config: {'iceServers': 
        [
          { url: 'stun:stun1.l.google.com:19302' },
          { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
        ]
      }
    });
  }
  
  setup({myVideoElement, peerVideoElement}) {
    this.myVideoElement = myVideoElement;
    this.peerVideoElement = peerVideoElement;
    this.peer.on('open', ::this.onOpen);
    this.peer.on('connection', ::this.onConnection);
    this.peer.on('call', ::this.onRecievedCall);    
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      navigator.getUserMedia(
        {
          audio: true, 
          video: true
        }, 
        (stream) => {
          console.log("getVideoSuccess");
          window.localStream = stream;
          this.myVideoElement.src = window.URL.createObjectURL(stream);
          window.peer_stream = stream;
          resolve();
        },
        (error) => {
          console.log("getVideoError");
          console.error(error);
          reject(error);
        }
      );
    });
  }
  
  connect({targetPeerId}) {
    const peerId = targetPeerId;
    this.conn = this.peer.connect(peerId, {metadata: {
      'username': this.username
    }});
    this.conn.on('data', this.handleMessages);
    const call = this.peer.call(peerId, window.localStream);
    call.on('stream', (stream) => {
      window.peer_stream = stream;
      this.onReceiveStream(stream, this.peerVideoElement);
    });
  }
  
  onOpen() {
    this.peerId = this.peer.id;
  }
  
  onConnection(connection) {
    this.conn = connection;
    this.conn.on('data', this.handleMessages);
  }
  
  onReceiveStream(stream, element) {
    window.peer_stream = stream;
    window.localStream = stream;
    element.src = window.URL.createObjectURL(stream);
    window.peer_stream = stream;
  }
  
  onRecievedCall(call) {
    call.answer(window.localStream);
    call.on('stream', (stream) => {
      window.peer_stream = stream;
      this.onReceiveStream(stream, this.peerVideoElement);
    });    
  }
  
  handleMessages(data) {
    console.log("handleMessages");
    console.log(data);
  }
  
  sendMeesage({message}) {
    console.log(message);
    const data = {'from': this.username, 'text': message};
    this.conn.send(data);
    this.handleMessages(data);
  }
}