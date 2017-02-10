import * as actions from '../actions';
import PeerClient from '../libs/peer-client';

const initState = () => {
  return {
    client: new PeerClient(),
    peerId: ''
  };
};

export const initial = initState();

const handlers = { 
  [actions.setUpSuccessedPeerClient]: (state, action) => {
    return {...state, peerId: state.client.peerId};
  }  
};

export default (state = initial, action) => {
  const handler = handlers[action.type];
  return !handler ? state : handler(state, action);
};
