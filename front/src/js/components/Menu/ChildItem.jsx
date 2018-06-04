import React, { Component } from 'react'
import { css } from 'glamor';
import { Link } from 'react-router-dom';

const child = css({
  width: '100%',
  height: '30px',
  margin: '5px 0px',
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
    lineHeight: '30px'
  }
})

export default class ChildItem extends Component {
  render() {
    return (
      <div {...child}>
        <img src="#" alt="userprofile image" />
        <Link to={`/user/${this.props.data.uuid}`}>
          {this.props.data.first_name} {this.props.data.last_name}
        </Link>

        <Link to={`/user/settings/${this.props.data.uuid}`} className='settings'>
          S
        </Link>
      </div>
    )
  }
}