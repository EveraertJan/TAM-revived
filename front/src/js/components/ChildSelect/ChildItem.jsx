import React, { Component } from 'react'
import { css } from 'glamor';
import { Link } from 'react-router-dom';
import history from './../../history'
import { connect } from 'react-redux' 

const child = css({
  width: '100%',
  color: '#ED4726',
  height: '30px',
  margin: '5px 0px',
  float: 'left',
  '> img': {
    width: '30px',
    height: '30px',
    float: 'left',
    marginRight: '10px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#eee'
  },
  '> .settings': {
    width: '20px',
    float: 'left',
    backgroundColor: '#eee',
    overflow: 'hidden',
    display: 'block'
  },
  '> a': {
    width: 'calc(100% - 60px)',
    float: 'left',
    overflow: 'hidden',
    display: 'block',
    lineHeight: '30px',
    color: '#aaa',
    textDecoration: 'none'
  }
})

class ChildItem extends Component {
  render() {
    return (
      <div {...child}>
        <img src="#" alt="userprofile image" />
        <Link to={`/${this.props.data.uuid}`}>
          {this.props.data.first_name} {this.props.data.last_name}
        </Link>
        <Link to={`/settings/${this.props.data.uuid}`} className='settings'>
          S
        </Link>
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
})(ChildItem);