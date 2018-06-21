
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const itemContainer = css({
  height: '280px',
  float: 'left',
  width: '200px',
  margin: '5px',
  overflow: 'hidden'
})
const imageContainer = css({
  width: '100%',
  height: '100px',
  overflow: 'hidden',
  '>img': {
    width: '100%'
  }

})
const postInfo = css({

})


class PostItem extends Component {
  render() {
    const { title, uuid, last_name, first_name, creator, url } = this.props.data
    return (
      <div {...itemContainer}>
        <div {...imageContainer}>
          <img src={`${process.env.REACT_APP_API_URL}${url}`} />
        </div>
        <div {...postInfo}>
          <h2>{title}</h2>
          <Link to={`${this.props.user.detail.uuid}/post/${uuid}`}>read more</Link>
        </div>
      </div>
    )
  }
}


export default connect(state => {
  return {
    user: state.user
  }
}, dispatch => {
 return {
 }
})(PostItem);
