import React from 'react';
import {connect} from 'react-redux';
import CSSModules from 'react-css-modules';
import {setUpPeerClient, connectPeerClient, sendMeesagePeerClient} from '../../actions';
import style from './PeerClientVideo.css';

@connect(state => ({
}), {
  setUpPeerClient,
  connectPeerClient,
  sendMeesagePeerClient
})
@CSSModules(style)
export default class PeerClientVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetPeerId: '',
      message: ''
    }
  }
  componentDidMount() {
    const myVideo = this.myVideo;
    const peerVideo = this.peerVideo;
    this.props.setUpPeerClient({myVideoElement: myVideo, peerVideoElement: peerVideo});
  }
  changeMessage(e) {
    this.setState({message: e.target.value})
  }
  changeTargetPeerId(e) {
    this.setState({targetPeerId: e.target.value});
  }
  connect() {
    this.props.connectPeerClient({targetPeerId: this.state.targetPeerId});
  }
  sendMessage() {
    this.props.sendMeesagePeerClient({message: this.state.message});
  }
  render() {
    return (
      <div>
        <p>Your peer ID : {this.props.peerClient.peerId}</p>
        <div>
          <video styleName="my-video" autoPlay ref={c => {this.myVideo = c} }></video>
          <video styleName="peer-video" autoPlay ref={c => {this.peerVideo = c}}></video>
        </div>
      </div>
    );
  }
}