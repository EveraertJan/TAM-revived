
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import { userPersistLogin, userLogOutAction } from './../../actions/UserActions'

const loginContainer = css({
  width: '300px',
  position: 'absolute',
  top: 'calc(50% - 200px)',
  left: 'calc(60% - 150px)',
  padding: '20px',
  boxSizing: 'border-box'
})
const imageContainer = css({
  width: '40%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: '#eee',
  position: 'fixed',
  left: '0px',
})

class FeedApp extends Component {
  componentDidMount() {
    if(!this.props.user.info.id) {
      //request user info
      this.props.persistLogin()
    } 
    else {
      console.log(this.props)
    }
  }
  render() {
    return (
      <span>
        <div {...imageContainer}>

        </div>
        <div {...loginContainer}>
        Welcome <a onClick={this.props.logout}>Log out</a>
        </div>
      </span>
    )
  }
}


export default connect(state => {
  return {
    user: state.user
  }
}, dispatch => {
 return {
  persistLogin: () => dispatch(userPersistLogin()),
  logout: () => dispatch(userLogOutAction())
 }
})(FeedApp);
