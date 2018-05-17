
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import MenuApp from './../Menu/MenuApp'

import { userPersistLogin } from './../../actions/UserActions'

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

class CreateApp extends Component {
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
        Create
        </div>
        <MenuApp />
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
  persistLogin: () => dispatch(userPersistLogin())
 }
})(CreateApp);
