
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';
import history from './../../history'
import { userGetInfo } from './../../actions/UserActions'
import { postFetchList } from './../../actions/PostActions'


import MenuApp from './../Menu/MenuApp'
import PostList from './PostList'

const postContainer = css({
  width: '900px',
  marginLeft: 'calc((100vw - 900px) / 2)',
  marginTop: '100px',
  padding: '20px',
  paddingBottom: '200px',
  boxSizing: 'border-box'
})

class FeedApp extends Component {
  
  componentDidMount() {
    this.props.getInfo(this.props.match.params.userID);
    this.props.getList(this.props.match.params.userID)
  }

  render() {
    console.log(this.props.user.detail.uuid )
    return (
      <span>
        <div {...postContainer}>
        { typeof this.props.user.detail.uuid !== undefined ? 
            <PostList /> : null } 
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
  getList: (user) => dispatch(postFetchList(user)),
  getInfo: (data) => dispatch(userGetInfo(data))
 }
})(FeedApp);
