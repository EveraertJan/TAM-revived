import { all, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import Auth from './../Modules/Auth'

import axios from 'axios';
import md5 from 'md5'
import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILED,
  USER_LOG_OUT,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_FAILED,
  USER_REGISTER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_PERSIST_LOGIN,
  USER_PERSIST_LOGIN_SUCCESS,
  USER_PERSIST_LOGIN_FAILED
} from './../actions/UserActions';


function* userRegister(action) {
  try {
    
    action.data.password = md5(action.data.password)
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/user/register`
    });
    yield put({ type: USER_REGISTER_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: USER_REGISTER_FAILED, message: e.message });
  }
}

function* userPersistLogin(action) {
  try {

    const result = yield axios({
      method: 'get',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      url: `${process.env.REACT_APP_API_URL}/user/info`
    });

    yield put({ type: USER_LOG_IN_SUCCESS, data: result.data });
    yield put(push(`/${result.data.uuid}`))

  } catch (e) {
    yield put({ type: USER_LOG_IN_FAILED, message: e.message });
  }
}

function* userLogin(action) {
  try {
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/user/login`
    });

    Auth.authenticateUser(result.data)

    yield put({ type: USER_LOG_IN_SUCCESS, data: result.data });
    yield put(push(`/${result.data.uuid}`))

  } catch (e) {
    yield put({ type: USER_LOG_IN_FAILED, message: e.message });
  }
}

function* userLogout(action) {
  try {
    const result = yield axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/user/logout`
    });
    Auth.deauthenticateUser()

    yield put({ type: USER_LOG_OUT_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: USER_LOG_OUT_FAILED, message: e.message });
  }
}


function* usersSagas() {
  yield all([
    takeEvery(USER_REGISTER, userRegister),
    takeEvery(USER_LOG_IN, userLogin),
    takeEvery(USER_LOG_OUT, userLogout),
    takeEvery(USER_PERSIST_LOGIN, userPersistLogin)
  ])
}

export default usersSagas