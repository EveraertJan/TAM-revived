import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { connect } from 'react-redux';

import Auth from './../Modules/Auth'

import LoginApp from './Login/LoginApp'
import RegisterApp from './Register/RegisterApp'
import FeedApp from './Feed/FeedApp'
import CreateChildApp from './CreateChild/CreateChildApp.jsx'
import DetailApp from './Detail/DetailApp'
import SettingsApp from './Settings/SettingsApp'
import ChildSelectApp from './ChildSelect/SelectChildApp'

import ModalsApp from './Modals/ModalsApp'

import { userPersistLogin, userGetInfo } from './../actions/UserActions'


class Main extends Component {
  
  componentDidMount() {
    if(!this.props.user.info.id) {
      //request user info
      this.props.persistLogin()
    }
  }

  render() {
    return (
      <span>
      {
        Auth.isUserAuthenticated() ?
        <span> 
          <Switch>
            <Route exact path='/register' component={RegisterApp} />
            <Route exact path='/login' component={LoginApp} />
            <Route exact path='/createChild' component={ CreateChildApp } />
            <Route exact path='/:userID' component={ FeedApp } />
            <Route exact path='/:userID/post/:uuid' component={ DetailApp } />
            <Route exact path='/:userID/settings/:uuid' component={ SettingsApp } />
            <Route exact path='/' component={ ChildSelectApp } />
          </Switch>
          <ModalsApp />
        </span>
        :
        <span> 
          <Switch>
            <Route exact path='/register' component={RegisterApp} />
            <Route exact path='/login' component={LoginApp} />
            <Route exact path='/' component={ LoginApp } />
          </Switch>
        </span>
      }
      </span>
      
    )
  }
}



export default connect(
  (state) => {
    return {
      user: state.user
    };
  },
  (dispatch) => {
    return {
      persistLogin: () => dispatch(userPersistLogin()),
    };
  }
)(Main);