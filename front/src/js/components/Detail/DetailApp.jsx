
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import MenuApp from './../Menu/MenuApp'
import UserBadge from './../Common/UserBadge'

import AddPart from './AddPart'
import PostPart from './PostPart'
import { postFetchDetail } from './../../actions/PostActions'

const detailContainer = css({
  width: 'calc(65% - 100px)',
  position: 'absolute',
  top: 'calc( 100px)',
  left: 'calc(35% + 50px)',
  padding: '20px',
  boxSizing: 'border-box',
  paddingBottom: '100px'
})

const imageContainer = css({
  width: '100%',
  overflow: 'hidden',
  minHeight: '200px',
  marginBottom: '50px',
    padding: '0px',
  '> img': {
    width: '100%',
    margin: '0px'
  }
})

class DetailApp extends Component {
  componentDidMount() {
    this.props.fetchDetail(this.props.match.params.uuid)
  }
  render() {
    const { title, uuid, last_name, first_name, creator, parts } = this.props.posts.detail.data
    return (
      <span>
        <div {...detailContainer}>
          <div {...imageContainer}>
            <img src="https://picsum.photos/600/400" />
          </div>

          <h1>{title}</h1>
          <UserBadge data={{...this.props.posts.detail.data, userID: creator}} />
          { parts ? parts.map((index, key) => {
            return <PostPart data={index} key={key} />
          }) : null}

          <AddPart />
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
