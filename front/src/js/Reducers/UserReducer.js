import {
  USER_LOG_IN,
  USER_LOG_IN_SUCCESS,
  USER_LOG_IN_FAILED,
  USER_GET_INFO,
  USER_GET_INFO_SUCCESS,
  USER_LOG_OUT,
  USER_LOG_OUT_SUCCESS,
  USER_LOG_OUT_FAILED,
  USER_REGISTER,
  USER_REGISTER_FAILED
} from './../actions/UserActions';

const initialState = {
  register: {
    loading: false,
    failed: false
  },
  login: {
    loading: false,
    failed: false
  },
  logout: {
    loading: false,
    failed: false
  },
  info: {},
  detail: {},
  loading: false
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOG_IN_SUCCESS: 
      console.log(action)
      return {
        ...state,
        info: action.data
      }
    case USER_GET_INFO: 
      console.log(action)
      return {
        ...state,
        loading: true
      }
    case USER_GET_INFO_SUCCESS: 
      console.log(action)
      return {
        ...state,
        detail: action.data,
        loading: false
      }
    case USER_REGISTER:
      return {
        ...state,
        register: {
          ...state.register,
          loading: true,
          failed: false
        }
      };
    case USER_REGISTER_FAILED:
      return {
        ...state,
        register: {
          ...state.register,
          loading: false,
          failed: true
        }
      };
    case USER_LOG_IN:
      return {
        ...state,
        login: {
          ...state.login,
          loading: true,
          failed: false
        }
      };
    case USER_LOG_IN_FAILED:
      return {
        ...state,
        login: {
          ...state.login,
          loading: false,
          failed: true
        }
      };
    case USER_LOG_OUT:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: true,
          failed: false
        }
      };    

    case USER_LOG_OUT_FAILED:
      return {
        ...state,
        logout: {
          ...state.logout,
          loading: false,
          failed: true
        }
      };

    case USER_LOG_OUT_SUCCESS:
      return {
        ...state,
        info: {},
        logout: {
          ...state.logout,
          loading: false,
          failed: false
        }
      };
    default:
      return state;
  }
}
