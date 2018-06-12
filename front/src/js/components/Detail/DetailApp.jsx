
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';

import MenuApp from './../Menu/MenuApp'
import UserBadge from './../Common/UserBadge'

import AddPart from './AddPart'
import AddImage from './AddImage'
import PostPart from './PostPart'
import { postFetchDetail, postUpdateHeader } from './../../actions/PostActions'

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
    this.saveHeaderFile = this.saveHeaderFile.bind(this)
  }
  componentDidMount() {
    this.props.fetchDetail(this.props.match.params.uuid)
  }
  saveHeaderFile() {
    this.props.updatePostHeader(this.props.file.image.data.uuid, this.props.posts.detail.data.uuid)
  }
  render() {
    const { parts, creator, title, url } = this.props.posts.detail.data
    console.log(url)
    return (
      <span>
        <div {...detailContainer}>
          <div {...imageContainer}>
            { 
              url === null ?
                <span>
                  <AddImage />
                { this.props.file.image.data.uuid ? <a {...cta} className="primary" onClick={this.saveHeaderFile}>Save Image</a> : null }
                </span>
              :
                <img src={`${process.env.REACT_APP_API_URL}${url}`} {...imageContainer} />
            }
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
  fetchDetail: (id) => dispatch(postFetchDetail(id)),
  updatePostHeader: (imageUuid, postUuid) => dispatch(postUpdateHeader(imageUuid, postUuid))
 }
})(DetailApp);
