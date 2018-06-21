
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { css } from 'glamor'

import { Link } from 'react-router-dom'


import { userLogOutAction } from './../../actions/UserActions'
import { modalShowPostCreateItem } from './../../actions/UtilsActions'

const menuContainer = css({
  width: '100vw',
  height: '50px',
  float: 'left',
  lineHeight: '30px',
  position: 'fixed',
  left: '0px',
  top: '0px',
  backgroundColor: '#ED4726',
  padding: '10px',
  boxSizing: 'border-box',
  '>a': {
    textDecoration: 'none',
    ':hover': {
      color: '#fff',
      textDecoration: 'underline'
    }
  }
})

const cta = css({
  display: 'block',
  float: 'left',
  height: '30px',
  boxSizing: 'border-box',
  textAlign: 'center',
  color: '#fff',
  margin: '0px 10px'
})

const header = css({
  display: 'block',
  height: '30px',
  padding: '0px 10px',
  fontSize: '1em',
  fontWeight: 'bold',
  color: '#fff',
  float: 'left',
})

const userActions = css({
  float: 'right'
})

class MenuApp extends Component {
  render() {
    return (
      <div {...menuContainer}>
        <Link to={'/'} {...header}>Tell about me </Link>
        <a {...cta} onClick={this.props.showCreateModal}>+ Tell a story</a>
        <div {...userActions}>
          <Link to={`/${this.props.user.info.id}`} {...cta}>Me</Link>
          <a {...cta} onClick={this.props.logout}>log out</a>
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
  logout: () => dispatch(userLogOutAction()),
  showCreateModal: () => dispatch(modalShowPostCreateItem())
 }
})(MenuApp);