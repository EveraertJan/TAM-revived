import { all, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import Auth from './../Modules/Auth'

import axios from 'axios';

import {
  POST_CREATE_ITEM,
  POST_CREATE_ITEM_SUCCESS,
  POST_CREATE_ITEM_FAILED
} from './../actions/PostActions';

import {
  UTILS_HIDE_MODAL_POST_CREATE
} from './../actions/UtilsActions'


function* postCreateItem(action) {
  try {
    const result = yield axios({
      method: 'post',
      data: action.data,
      url: `${process.env.REACT_APP_API_URL}/post/create`,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
    yield put({ type: POST_CREATE_ITEM_SUCCESS, data: result.data });
    yield put({ type: UTILS_HIDE_MODAL_POST_CREATE });
  } catch (e) {
    yield put({ type: POST_CREATE_ITEM_FAILED, message: e.message });
  }
}


function* postSagas() {
  yield all([
    takeEvery(POST_CREATE_ITEM, postCreateItem)
  ])
}

export default postSagas