import { all, spawn } from 'redux-saga/effects';

import UserSagas from './UserSagas';
import PostSagas from './PostSagas';

export default function* rootSaga() {
  yield all([
    spawn(UserSagas),
    spawn(PostSagas)
  ]);
}
