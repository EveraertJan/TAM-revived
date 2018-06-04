import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import Auth from './../Modules/Auth'

import axios from 'axios';
import {
  SETTINGS_GET_WRITERS,
  SETTINGS_GET_WRITERS_SUCCESS,
  SETTINGS_GET_WRITERS_FAILED,
  SETTINGS_ADD_WRITER,
  SETTINGS_ADD_WRITER_SUCCESS,
  SETTINGS_ADD_WRITER_FAILED
} from './../actions/SettingsActions';

import { 
  USER_GET_INFO_SUCCESS
} from './../actions/UserActions'



function* getWriters(action) {
  try {
    const result = yield axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/user/writers/${action.data.uuid}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
    });
    yield put({ type: SETTINGS_GET_WRITERS_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: SETTINGS_GET_WRITERS_FAILED, message: e.message });
  }
}

function* addWriter(action) {
  try {
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/user/writers`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
    });
    console.log(result)
    yield put({ type: SETTINGS_ADD_WRITER_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: SETTINGS_ADD_WRITER_FAILED, message: e.message });
  }
}



function* usersSagas() {
  yield all([
    takeEvery(SETTINGS_GET_WRITERS, getWriters),
    takeEvery(SETTINGS_ADD_WRITER, addWriter),
    takeEvery(SETTINGS_ADD_WRITER_SUCCESS, getWriters),
    takeLatest(USER_GET_INFO_SUCCESS, getWriters)
  ])
}

export default usersSagas