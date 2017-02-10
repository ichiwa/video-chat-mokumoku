import {createAction} from 'redux-actions';

export const setUpPeerClient = createAction('setUpPeerClient');
export const setUpSuccessedPeerClient = createAction('setUpSuccessedPeerClient');
export const connectPeerClient = createAction('connectPeerClient');
export const sendMeesagePeerClient = createAction('sendMeesagePeerClient');