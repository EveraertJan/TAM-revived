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

import ModalsApp from './Modals/ModalsApp'

class Main extends Component {
  render() {
    return (
      <span>
        <Switch>
          <Route exact path='/register' component={RegisterApp} />
          <Route exact path='/createChild' component={ Auth.isUserAuthenticated() ? CreateChildApp :  LoginApp} />
          <Route exact path='/post/:uuid' component={ Auth.isUserAuthenticated() ? DetailApp :  LoginApp} />
          <Route exact path='/user/settings/:uuid' component={ Auth.isUserAuthenticated() ? SettingsApp :  LoginApp} />
          <Route exact path='/user/:uuid' component={ Auth.isUserAuthenticated() ? FeedApp  :  LoginApp} />
          <Route exact path='/' component={ Auth.isUserAuthenticated() ? FeedApp :  LoginApp} />
        </Switch>
        <ModalsApp />
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
    };
  }
)(Main);