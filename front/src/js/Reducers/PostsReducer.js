import {
  POST_DELETE_ITEM,
  POST_DELETE_ITEM_SUCCESS,
  POST_DELETE_ITEM_FAILED,

  POST_CREATE_ITEM,
  POST_CREATE_ITEM_SUCCESS,
  POST_CREATE_ITEM_FAILED,

  POST_CREATE_PART,
  POST_CREATE_PART_SUCCESS,
  POST_CREATE_PART_FAILED,

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
  part: {
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
    data: []
  }
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case POST_CREATE_ITEM: 
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          failed: false,
          data: {}
        }
      }

    case POST_CREATE_PART: 
      return {
        ...state,
        part: {
          ...state.part,
          loading: true,
          failed: false,
          data: {}
        }
      }

    case POST_FETCH_LIST: 
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          failed: false,
          data: []
        }
      }
    case POST_FETCH_LIST_FAILED: 
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          failed: true,
          data: []
        }
      }

    case POST_FETCH_LIST_SUCCESS: 
      return {
        ...state,
        list: {
          ...state.list,
          loading: true,
          failed: false,
          data: action.data
        }
      }


    case POST_FETCH_DETAIL: 
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: true,
          failed: false,
          data: {}
        }
      }
    case POST_FETCH_DETAIL_FAILED: 
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: false,
          failed: true,
          data: {}
        }
      }

    case POST_FETCH_DETAIL_SUCCESS: 
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: true,
          failed: false,
          data: action.data
        }
      }
    default:
      return state;
  }
}
