
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import MenuApp from './../Menu/MenuApp'
import PostList from './PostList'
import { userPersistLogin, userGetInfo } from './../../actions/UserActions'

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
  }

  componentDidUpdate() {
    if(this.props.user.detail === {} || this.props.user.detail.uuid !== this.props.match.params.uuid && !this.props.user.loading) {
      this.props.getInfo(this.props.match.params.uuid ? this.props.match.params.uuid : this.props.user.detail.uuid )
    }
  }

  render() {
    return (
      <span>
        <div {...postContainer}>
          <PostList /> 
        </div>
        { this.props.user.info.id ? 
          <MenuApp />
           : null }
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
  getInfo: (data) => dispatch(userGetInfo(data))
 }
})(FeedApp);
