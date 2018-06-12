import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import Auth from './../Modules/Auth'

import {
  FILE_UPLOAD_IMAGE,
  FILE_UPLOAD_IMAGE_SUCCESS,
  FILE_UPLOAD_IMAGE_FAILED,
} from './../actions/FileActions.js'


function* uploadImage(action) {
   try {
      const result = yield axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/file/upload`,
        data: action.payload,
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })

      //const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: FILE_UPLOAD_IMAGE_SUCCESS, data: result.data});
   } catch (e) {
      yield put({type: FILE_UPLOAD_IMAGE_FAILED, message: e.message});
   }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* fileSagas() {
  yield takeEvery(FILE_UPLOAD_IMAGE, uploadImage);
}

export default fileSagas;

