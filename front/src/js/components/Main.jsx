import React, { Component } from 'react'
import { Switch, Route } from 'react-router'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import Auth from './../Modules/Auth'

import LoginApp from './Login/LoginApp'
import RegisterApp from './Register/RegisterApp'
import FeedApp from './Feed/FeedApp'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/register' component={RegisterApp} />
        <Route exact path='/' component={ Auth.isUserAuthenticated() ? FeedApp :  LoginApp} />
      </Switch>
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