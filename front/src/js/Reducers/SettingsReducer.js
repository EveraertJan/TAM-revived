import {
  SETTINGS_GET_WRITERS,
  SETTINGS_GET_WRITERS_SUCCESS,
  SETTINGS_GET_WRITERS_FAILED
} from './../actions/SettingsActions';

const initialState = {
  writers: []
};

export function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_GET_WRITERS_SUCCESS: 
      console.log(action)
      return {
        ...state,
        writers: action.data
      }
    default:
      return state;
  }
}
