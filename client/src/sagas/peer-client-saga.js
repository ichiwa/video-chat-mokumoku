import {takeEvery, delay} from 'redux-saga';
import {select, put, call} from 'redux-saga/effects';
import * as actions from '../actions';

function * setupEventHandler(data) {
  const client = yield select(state => state.peerClientReducer.client);
  const ret = yield client.setup(data.payload);
  yield call(delay, 1000);
  yield put(actions.setUpSuccessedPeerClient());
}

function * connectEventHandler(data) {
  const client = yield select(state => state.peerClientReducer.client);
  client.connect(data.payload);
}

function * sendMessageEventHandler(data) {
  const client = yield select(state => state.peerClientReducer.client);
  client.sendMeesage(data.payload);
}

export default function * () {
  yield [
    takeEvery(actions.setUpPeerClient.toString(), setupEventHandler),
    takeEvery(actions.connectPeerClient.toString(), connectEventHandler),
    takeEvery(actions.sendMeesagePeerClient.toString(), sendMessageEventHandler)
  ];
}
