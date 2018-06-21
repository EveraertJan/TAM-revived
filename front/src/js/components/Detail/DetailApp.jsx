
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import MenuApp from './../Menu/MenuApp'
import UserBadge from './../Common/UserBadge'

import AddPart from './AddPart'
import PostPart from './PostPart'
import { postFetchDetail } from './../../actions/PostActions'

const detailContainer = css({
  width: '900px',
  marginLeft: 'calc((100vw - 900px) / 2)',
  marginTop: '100px',
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

const cta = css({
  float: 'right',
  textDecoration: 'none',
  padding: '0px 10px',
  margin: '10px',
  marginRight: '0px',
  height: '40px',
  lineHeight: '40px',
  '.primary': {
    backgroundColor: '#000',
    color: '#fff',
    ':hover': {
      backgroundColor: '#333',
      color: '#fff'
    }
  },
  '.secundary': {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    ':hover': {
      backgroundColor: '#eeeeee',
      color: '#333333'
    }

  }
})

const img = css({
  width:  '100%',
  float: 'left'
})
class DetailApp extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.fetchDetail(this.props.match.params.uuid)
  }
  render() {
    const { parts, creator, title, url } = this.props.posts.detail.data
    console.log(url)
    return (
      <span>
        <div {...detailContainer}>
          <div {...imageContainer}>
            <img src={`${process.env.REACT_APP_API_URL}${url}`} {...imageContainer} />
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
    posts: state.posts,
    file: state.file
  }
}, dispatch => {
 return {
  fetchDetail: (id) => dispatch(postFetchDetail(id))
 }
})(DetailApp);
