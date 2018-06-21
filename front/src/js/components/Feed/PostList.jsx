
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostItem from './PostItem'

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
