import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { routerReducer } from 'react-router-redux'

import { userReducer } from './UserReducer';
import { postsReducer } from './PostsReducer';
import { utilsReducer } from './UtilsReducer'
import { settingsReducer } from './SettingsReducer'
import { fileReducer } from './FileReducer'

const tellAboutMe = combineReducers({
  form: formReducer,
  user: userReducer,
  posts: postsReducer,
  utils: utilsReducer,
  routing: routerReducer,
  settings: settingsReducer,
  file: fileReducer
})

export default tellAboutMe