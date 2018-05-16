import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { userReducer } from './UserReducer';

import { routerReducer } from 'react-router-redux'

const tellAboutMe = combineReducers({
  form: formReducer,
  user: userReducer,
  routing: routerReducer

})

export default tellAboutMe