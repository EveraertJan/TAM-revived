import {
  UTILS_SHOW_MODAL_POST_CREATE,
  UTILS_HIDE_MODAL_POST_CREATE,
  
} from './../actions/UtilsActions';

const initialState = {
  displayPostCreateItem: false
};

export function utilsReducer(state = initialState, action) {
  switch (action.type) {
    case UTILS_SHOW_MODAL_POST_CREATE: 
      return {
        ...state,
        displayPostCreateItem: true
      }
    case UTILS_HIDE_MODAL_POST_CREATE: 
      return {
        ...state,
        displayPostCreateItem: false
      }
    default:
      return state;
  }
}
