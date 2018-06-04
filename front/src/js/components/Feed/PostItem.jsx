
import React, { Component } from 'react';
import { css } from 'glamor'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const itemContainer = css({
  height: '300px',
  float: 'left',
  width: '200px',
  margin: '10px',
  '>img': {
    width: '100%',
    height: '100px',
    backgroundColor: '#eee'
  }
})
const postInfo = css({

})


class PostItem extends Component {
  render() {
    const { title, uuid, last_name, first_name, creator } = this.props.data
    return (
      <div {...itemContainer}>
        <img src="#" />
        <div {...postInfo}>
          <h2>{title}</h2>
          <Link to={`/post/${uuid}`}>read more</Link>
        </div>
      </div>
    )
  }
}


export default connect(state => {
  return {}
}, dispatch => {
 return {
 }
})(PostItem);
