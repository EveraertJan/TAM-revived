
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import MenuApp from './../Menu/MenuApp'
import PostList from './PostList'
import { userPersistLogin } from './../../actions/UserActions'

const postContainer = css({
  width: '600px',
  position: 'absolute',
  top: 'calc(200px)',
  left: 'calc(50% - 150px)',
  padding: '20px',
  paddingBottom: '200px',
  boxSizing: 'border-box'
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
        <div {...postContainer}>
          { this.props.user.info.id ? <PostList /> : null  } 
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
})(FeedApp);
