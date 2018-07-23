import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import history from './../history'

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
  USER_CREATE_CHILD,
  USER_CREATE_CHILD_SUCCESS,
  USER_CREATE_CHILD_FAILED,
  USER_GET_INFO,
  USER_GET_INFO_SUCCESS,
  USER_GET_INFO_FAILED,
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

function* userCreateChild(action) {
  try {
    
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/user/createChild`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
    });
    yield put({ type: USER_CREATE_CHILD_SUCCESS, data: result.data });
    // history.push('/');
  } catch (e) {
    yield put({ type: USER_CREATE_CHILD_FAILED, message: e.message });
  }
}


function* userRenewInfo(action) {
  try {
    const result = yield axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/user/renewinfo`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
    });
    console.log('totla', result)
    yield put({ type: USER_PERSIST_LOGIN_SUCCESS, data: result.data.user });
    history.push('/');
  } catch (e) {
    yield put({ type: USER_PERSIST_LOGIN_FAILED, message: e.message });
  }
}


function* userGetInfo(action) {
  try {
    
    const result = yield axios({
      method: 'get',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/user/info/${action.data}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
    });
    yield put({ type: USER_GET_INFO_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: USER_GET_INFO_FAILED, message: e.message });
  }
}

function* userPersistLogin(action) {
  try {

    const result = yield axios({
      method: 'get',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      url: `${process.env.REACT_APP_API_URL}/user/info`
    });

    yield put({ type: USER_PERSIST_LOGIN_SUCCESS, data: result.data });

  } catch (e) {
    yield put({ type: USER_PERSIST_LOGIN_FAILED, message: e.message });
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
    history.push('/')

    yield put({ type: USER_LOG_IN_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: USER_LOG_IN_FAILED, message: e.message });
  }
}

function* userLogout(action) {
  try {
    Auth.deauthenticateUser()
    const result = yield axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/user/logout`
    });
    history.push('/login')

    yield put({ type: USER_LOG_OUT_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: USER_LOG_OUT_FAILED, message: e.message });
  }
}


function* usersSagas() {
  yield all([
    takeEvery(USER_REGISTER, userRegister),
    takeEvery(USER_LOG_IN, userLogin),
    takeEvery(USER_LOG_IN_SUCCESS, userPersistLogin),
    takeEvery(USER_LOG_OUT, userLogout),
    takeEvery(USER_PERSIST_LOGIN, userPersistLogin),
    takeEvery(USER_CREATE_CHILD, userCreateChild),
    takeEvery(USER_CREATE_CHILD_SUCCESS, userRenewInfo),
    takeLatest(USER_GET_INFO, userGetInfo)
  ])
}

export default usersSagas