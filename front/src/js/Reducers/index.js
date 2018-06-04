import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { userReducer } from './UserReducer';
import { postsReducer } from './PostsReducer';
import { utilsReducer } from './UtilsReducer'
import { settingsReducer } from './SettingsReducer'
import { routerReducer } from 'react-router-redux'

const tellAboutMe = combineReducers({
  form: formReducer,
  user: userReducer,
  posts: postsReducer,
  utils: utilsReducer,
  routing: routerReducer,
  settings: settingsReducer
})

export default tellAboutMe