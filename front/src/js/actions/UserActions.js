export const USER_LOG_IN = 'tellaboutme/USER_LOG_IN';
export const USER_LOG_IN_SUCCESS = 'tellaboutme/USER_LOG_IN_SUCCESS';
export const USER_LOG_IN_FAILED = 'tellaboutme/USER_LOG_IN_FAILED';

export const USER_LOG_OUT = 'tellaboutme/USER_LOG_OUT';
export const USER_LOG_OUT_SUCCESS = 'tellaboutme/USER_LOG_OUT_SUCCESS';
export const USER_LOG_OUT_FAILED = 'tellaboutme/USER_LOG_OUT_FAILED';

export const USER_REGISTER = 'tellaboutme/USER_REGISTER';
export const USER_REGISTER_SUCCESS = 'tellaboutme/USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED = 'tellaboutme/USER_REGISTER_FAILED';

export const USER_PERSIST_LOGIN = 'tellaboutme/USER_PERSIST_LOGIN';
export const USER_PERSIST_LOGIN_SUCCESS = 'tellaboutme/USER_PERSIST_LOGIN_SUCCESS';
export const USER_PERSIST_LOGIN_FAILED = 'tellaboutme/USER_PERSIST_LOGIN_FAILED';

export function userPersistLogin(data) {
  return {
    type: USER_PERSIST_LOGIN,
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