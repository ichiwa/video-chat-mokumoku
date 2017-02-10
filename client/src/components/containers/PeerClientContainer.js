import React from 'react';
import {connect} from 'react-redux';
import PeerClientVideo from '../presenters/PeerClientVideo';

@connect(state => ({
  peerClient: state.peerClientReducer
}))
export default class PeerClientContainer extends React.Component {
  render() {
    return (
      <PeerClientVideo peerClient={this.props.peerClient}/>
    );
  }
}