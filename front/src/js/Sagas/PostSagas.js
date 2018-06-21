import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import history from './../history'
import Auth from './../Modules/Auth'

import axios from 'axios';

import {
  POST_CREATE_ITEM,
  POST_CREATE_ITEM_SUCCESS,
  POST_CREATE_ITEM_FAILED,
  POST_CREATE_PART,
  POST_CREATE_PART_SUCCESS,
  POST_CREATE_PART_FAILED,
  POST_FETCH_LIST,
  POST_FETCH_LIST_SUCCESS,
  POST_FETCH_LIST_FAILED,
  POST_FETCH_DETAIL,
  POST_FETCH_DETAIL_SUCCESS,
  POST_FETCH_DETAIL_FAILED,
  POST_UPDATE_HEADER,
  POST_UPDATE_HEADER_SUCCESS,
  POST_UPDATE_HEADER_FAILED
} from './../actions/PostActions';

import { 
  USER_GET_INFO_SUCCESS,
  USER_LOG_IN_SUCCESS
} from './../actions/UserActions'

import {
  UTILS_HIDE_MODAL_POST_CREATE
} from './../actions/UtilsActions'


function* postFetchList(action) {
  try {

    console.log(action)
    if(action.data.uuid) {
      const result = yield axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}/posts/user/${action.data.uuid}`,
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      });
      yield put({ type: POST_FETCH_LIST_SUCCESS, data: result.data });
    }
  } catch (e) {
    yield put({ type: POST_FETCH_LIST_FAILED, message: e.message });
  }
}

function* postFetchDetail(action) {
  try {
    const result = yield axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/posts/${action.data}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
    yield put({ type: POST_FETCH_DETAIL_SUCCESS, data: result.data });

  } catch (e) {
    yield put({ type: POST_FETCH_DETAIL_FAILED, message: e.message });
  }
}


function* postUpdateHeader(action) {
  try {
    const result = yield axios({
      method: 'post',
      data: {
        imageUuid: action.imageUuid,
        postUuid: action.postUuid
      },
      url: `${process.env.REACT_APP_API_URL}/posts/update/header`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
    yield put({ type: POST_UPDATE_HEADER_SUCCESS, data: result.data });

  } catch (e) {
    yield put({ type: POST_UPDATE_HEADER_FAILED, message: e.message });
  }
}

function* postCreateItem(action) {
  try {
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/posts/create`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
    history.push(`${action.data.creator}/post/${result.data[0]}`);
    yield put({ type: POST_CREATE_ITEM_SUCCESS, data: result.data });
    yield put({ type: UTILS_HIDE_MODAL_POST_CREATE });
  } catch (e) {
    yield put({ type: POST_CREATE_ITEM_FAILED, message: e.message });
  }
}


function* postCreatePart(action) {
  try {
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/posts/add/${action.data.postID}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
    yield put({ type: POST_FETCH_DETAIL, data: action.data.postID });
    yield put({ type: POST_CREATE_PART_SUCCESS, data: result.data });
  } catch (e) {
    yield put({ type: POST_CREATE_PART_FAILED, message: e.message });
  }
}


function* postSagas() {
  yield all([
    takeEvery(POST_CREATE_ITEM, postCreateItem),
    takeEvery(POST_CREATE_PART, postCreatePart),
    takeEvery(POST_FETCH_LIST, postFetchList),
    takeEvery(POST_UPDATE_HEADER, postUpdateHeader),
    takeEvery(POST_FETCH_DETAIL, postFetchDetail),
    takeLatest(USER_GET_INFO_SUCCESS, postFetchList),
    takeLatest(USER_LOG_IN_SUCCESS, postFetchList)
  ])
}

export default postSagas