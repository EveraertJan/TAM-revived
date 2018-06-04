
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import MenuApp from './../Menu/MenuApp'
import PostItem from './PostItem'
import { postFetchList } from './../../actions/PostActions'

class PostList extends Component {
  render() {
    return (
      <span>
        {this.props.posts.list.data.map((index, key) => {
          return <PostItem key={key} data={index} />
        })}
      </span>
    )
  }
}


export default connect(state => {
  return {
    user: state.user,
    posts: state.posts
  }
}, dispatch => {
 return {
 }
})(PostList);
