import {fork} from 'redux-saga/effects';
import peerClientSaga from './peer-client-saga';

function * preprocess() {
  console.log("do preprocess");
}

export default function * () {
  yield fork(preprocess);
  yield fork(peerClientSaga);
}