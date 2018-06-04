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
  POST_FETCH_DETAIL_FAILED
} from './../actions/PostActions';

import { 
  USER_GET_INFO_SUCCESS
} from './../actions/UserActions'

import {
  UTILS_HIDE_MODAL_POST_CREATE
} from './../actions/UtilsActions'


function* postFetchList(action) {
  try {
    console.log(action)
    const result = yield axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/posts/user/${action.data.uuid}`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
    yield put({ type: POST_FETCH_LIST_SUCCESS, data: result.data });

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

function* postCreateItem(action) {
  try {
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/post/create`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
    history.push(`/post/${result.data[0]}`);
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
      url: `${process.env.REACT_APP_API_URL}/post/add/${action.data.postID}`,
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
    takeEvery(POST_FETCH_DETAIL, postFetchDetail),
    takeLatest(USER_GET_INFO_SUCCESS, postFetchList)
  ])
}

export default postSagas