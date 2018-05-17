export const POST_FETCH_LIST = 'tellaboutme/POST_FETCH_LIST';
export const POST_FETCH_LIST_SUCCESS = 'tellaboutme/POST_FETCH_LIST_SUCCESS';
export const POST_FETCH_LIST_FAILED = 'tellaboutme/POST_FETCH_LIST_FAILED';

export const POST_FETCH_DETAIL = 'tellaboutme/POST_FETCH_DETAIL';
export const POST_FETCH_DETAIL_SUCCESS = 'tellaboutme/POST_FETCH_DETAIL_SUCCESS';
export const POST_FETCH_DETAIL_FAILED = 'tellaboutme/POST_FETCH_DETAIL_FAILED';

export const POST_CREATE_ITEM = 'tellaboutme/POST_CREATE_ITEM';
export const POST_CREATE_ITEM_SUCCESS = 'tellaboutme/POST_CREATE_ITEM_SUCCESS';
export const POST_CREATE_ITEM_FAILED = 'tellaboutme/POST_CREATE_ITEM_FAILED';

export const POST_DELETE_ITEM = 'tellaboutme/POST_DELETE_ITEM';
export const POST_DELETE_ITEM_SUCCESS = 'tellaboutme/POST_DELETE_ITEM_SUCCESS';
export const POST_DELETE_ITEM_FAILED = 'tellaboutme/POST_DELETE_ITEM_FAILED';

export const POST_CREATE_INFO = 'tellaboutme/POST_CREATE_INFO';
export const POST_CREATE_INFO_SUCCESS = 'tellaboutme/POST_CREATE_INFO_SUCCESS';
export const POST_CREATE_INFO_FAILED = 'tellaboutme/POST_CREATE_INFO_FAILED';


export function postFetchList(data) {
  return {
    type: POST_FETCH_LIST,
    data
  };
}

export function postFetchDetail(data) {
  return {
    type: POST_FETCH_DETAIL,
    data
  };
}

export function postCreateItem(data) {
  return {
    type: POST_CREATE_ITEM,
    data
  };
}

export function postCreateInfo(data) {
  return {
    type: POST_CREATE_INFO,
    data
  };
}

export function postDeleteItem(data) {
  return {
    type: POST_DELETE_ITEM,
    data
  };
}