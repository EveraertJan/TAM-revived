export const USER_LOG_IN = 'tellaboutme/USER_LOG_IN';
export const USER_LOG_IN_SUCCESS = 'tellaboutme/USER_LOG_IN_SUCCESS';
export const USER_LOG_IN_FAILED = 'tellaboutme/USER_LOG_IN_FAILED';

export const USER_LOG_OUT = 'tellaboutme/USER_LOG_OUT';
export const USER_LOG_OUT_SUCCESS = 'tellaboutme/USER_LOG_OUT_SUCCESS';
export const USER_LOG_OUT_FAILED = 'tellaboutme/USER_LOG_OUT_FAILED';

export const USER_REGISTER = 'tellaboutme/USER_REGISTER';
export const USER_REGISTER_SUCCESS = 'tellaboutme/USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED = 'tellaboutme/USER_REGISTER_FAILED';

export const USER_CREATE_CHILD = 'tellaboutme/USER_CREATE_CHILD';
export const USER_CREATE_CHILD_SUCCESS = 'tellaboutme/USER_CREATE_CHILD_SUCCESS';
export const USER_CREATE_CHILD_FAILED = 'tellaboutme/USER_CREATE_CHILD_FAILED';

export const USER_PERSIST_LOGIN = 'tellaboutme/USER_PERSIST_LOGIN';
export const USER_PERSIST_LOGIN_SUCCESS = 'tellaboutme/USER_PERSIST_LOGIN_SUCCESS';
export const USER_PERSIST_LOGIN_FAILED = 'tellaboutme/USER_PERSIST_LOGIN_FAILED';

export const USER_GET_INFO = 'tellaboutme/USER_GET_INFO';
export const USER_GET_INFO_SUCCESS = 'tellaboutme/USER_GET_INFO_SUCCESS';
export const USER_GET_INFO_FAILED = 'tellaboutme/USER_GET_INFO_FAILED';



export function userPersistLogin(data) {
  return {
    type: USER_PERSIST_LOGIN,
    data
  };
}

export function userGetInfo(data) {
  return {
    type: USER_GET_INFO,
    data
  };
}

export function userLogInAction(data) {
  return {
    type: USER_LOG_IN,
    data
  };
}

export function userLogOutAction() {
  return {
    type: USER_LOG_OUT
  };
}

export function userRegisterAction(data) {
  return {
    type: USER_REGISTER,
    data
  };
}

export function userCreateChild(data) {
  return {
    type: USER_CREATE_CHILD,
    data
  }
}