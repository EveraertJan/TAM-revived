
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import MenuApp from './../Menu/MenuApp'
import UserBadge from './../Common/UserBadge'

import { postFetchDetail } from './../../actions/PostActions'

const detailContainer = css({
  width: '300px',
  position: 'absolute',
  top: 'calc( 100px)',
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

class DetailApp extends Component {
  componentDidMount() {
    this.props.fetchDetail(this.props.match.params.uuid)
  }
  render() {
    const { title, uuid, last_name, first_name, creator } = this.props.posts.detail.data

    return (
      <span>
        <div {...imageContainer}>
          <img />
        </div>
        <div {...detailContainer}>
          <h1>{title}</h1>
          <UserBadge data={{...this.props.posts.detail.data, userID: creator}} />
        </div>
        <MenuApp />
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
  fetchDetail: (id) => dispatch(postFetchDetail(id))
 }
})(DetailApp);
