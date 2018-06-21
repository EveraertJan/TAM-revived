
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { css } from 'glamor'

import { Link } from 'react-router-dom'

import ChildItem from './ChildItem'
import MenuApp from './../Menu/MenuApp'

import { userGetInfo } from './../../actions/UserActions'
import { userLogOutAction } from './../../actions/UserActions'
import { modalShowPostCreateItem } from './../../actions/UtilsActions'

const cta = css({
  display: 'block',
  float: 'left',
  height: '30px',
  boxSizing: 'border-box',
  textAlign: 'center',
  color: '#fff',
  margin: '0px 10px'
})

const childrenContainer = css({
  display: 'block',
  height: '30px',
  width: '300px',
  position: 'fixed',
  top: '300px',
  left: 'calc(50% - 150px)'
})

const createCTA = css({
  color: '#aaa',
  textDecoration: 'none',
  marginTop: '20px'
})

class SelectChildApp extends Component {
  
  render() {
    return (
      <span>
        <MenuApp />
        <span {...childrenContainer}>
          { this.props.user.info.relations ? this.props.user.info.relations.map((index, key) => {
            return <ChildItem key={key} data={index} />
          })
          : null }

          <Link {...cta} {...createCTA} to={'/createChild'}>Create child</Link>
        </span>
      </span>
    )
  }
}


export default connect(state => {
  return {
    user: state.user
  }
}, dispatch => {
 return {
  getInfo: (data) => dispatch(userGetInfo(data)),
  logout: () => dispatch(userLogOutAction()),
  showCreateModal: () => dispatch(modalShowPostCreateItem())
 }
})(SelectChildApp);