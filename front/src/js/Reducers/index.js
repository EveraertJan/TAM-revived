import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { userReducer } from './UserReducer';
import { postReducer } from './PostReducer';
import { utilsReducer } from './UtilsReducer'

import { routerReducer } from 'react-router-redux'

const tellAboutMe = combineReducers({
  form: formReducer,
  user: userReducer,
  post: postReducer,
  utils: utilsReducer,
  routing: routerReducer
})

export default tellAboutMe