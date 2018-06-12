import { all, spawn } from 'redux-saga/effects';

import UserSagas from './UserSagas';
import PostSagas from './PostSagas';
import SettingsSagas from './SettingsSagas'
import FileSagas from './FileSagas'

export default function* rootSaga() {
  yield all([
    spawn(UserSagas),
    spawn(PostSagas),
    spawn(SettingsSagas),
    spawn(FileSagas)
  ]);
}
