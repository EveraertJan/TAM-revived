
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { css } from 'glamor'

import { Link } from 'react-router-dom'

import { userLogOutAction } from './../../actions/UserActions'
import { modalShowPostCreateItem } from './../../actions/UtilsActions'

const menuContainer = css({
  width: '500px',
  height: '50px',
  lineHeight: '30px',
  position: 'fixed',
  top: 'calc(100% - 90px)',
  left: 'calc(50% - 250px)',
  backgroundColor: '#fff',
  padding: '10px',
  boxSizing: 'border-box',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)'
})

const cta = css({
  display: 'block',
  float: 'left',
  height: '30px',
  padding: '0px 10px',
  marginLeft: '20px'
})

const header = css({
  display: 'block',
  height: '30px',
  padding: '0px 10px',
  float: 'left',
  marginLeft: '20px'
})


class MenuApp extends Component {
  render() {
    return (
      <div {...menuContainer}>
        <span {...header}>Tell about me </span>
        <a onClick={this.props.showCreateModal}>+ Tell a story</a>
        <a onClick={this.props.logout} {...cta}>Log out</a>
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