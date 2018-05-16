import { all, spawn } from 'redux-saga/effects';

import UserSagas from './UserSagas';

export default function* rootSaga() {
  yield all([
    spawn(UserSagas)
  ]);
}
