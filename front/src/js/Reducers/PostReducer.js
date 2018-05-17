import {
  POST_DELETE_ITEM,
  POST_DELETE_ITEM_SUCCESS,
  POST_DELETE_ITEM_FAILED,

  POST_CREATE_ITEM,
  POST_CREATE_ITEM_SUCCESS,
  POST_CREATE_ITEM_FAILED,

  POST_CREATE_INFO,
  POST_CREATE_INFO_SUCCESS,
  POST_CREATE_INFO_FAILED,

  POST_FETCH_LIST,
  POST_FETCH_LIST_SUCCESS,
  POST_FETCH_LIST_FAILED,
  
  POST_FETCH_DETAIL,
  POST_FETCH_DETAIL_SUCCESS,
  POST_FETCH_DETAIL_FAILED,
  
} from './../actions/PostActions';

const initialState = {
  list: {
    loading: false,
    failed: false,
    data: []
  },
  detail: {
    loading: false,
    failed: false,
    data: {}
  },
  create: {
    loading: false,
    failed: false,
    data: {}
  },
  delete: {
    loading: false,
    failed: false,
    data: {}
  }
};

export function postReducer(state = initialState, action) {
  switch (action.type) {
    case POST_CREATE_ITEM: 
      console.log(action)
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          failed: false,
          data: {}
        }
      }
    default:
      return state;
  }
}
