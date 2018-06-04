
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { css } from 'glamor'

import { Link } from 'react-router-dom'

import ChildItem from './ChildItem'

import { userLogOutAction, userPersistLogin } from './../../actions/UserActions'
import { modalShowPostCreateItem } from './../../actions/UtilsActions'

const menuContainer = css({
  width: '300px',
  height: '100vh',
  lineHeight: '30px',
  position: 'fixed',
  left: '0px',
  top: '0px',
  backgroundColor: '#fff',
  padding: '10px',
  boxSizing: 'border-box',
})

const cta = css({
  display: 'block',
  float: 'left',
  height: '30px',
  boxSizing: 'border-box',
  width: '100px',
  textAlign: 'center'
})

const header = css({
  display: 'block',
  height: '30px',
  padding: '0px 10px',
  fontSize: '2em',
  fontWeight: 'bold',
  float: 'left',
  width: '500px',
  position: 'fixed',
  left: '0px',
  top: 'calc(50% - 200px)',
  transform: 'rotate(270deg)'
})

const children = css({
  width: '180px',
  display: 'block',
  position: 'fixed',
  left: '50px',
  height: '300px',
  top: '50px'
})

const userActions = css({
  position: 'fixed',
  top: 'calc(100% - 40px)',
  width: '100%'
})


class MenuApp extends Component {
  componentDidMount() {
    if(!this.props.user.info.id) {
      //request user info
      this.props.persistLogin()
    }
  }
  render() {
    return (
      <div {...menuContainer}>
        <span {...header}>Tell about me </span>
        <span {...children}>
        { this.props.user.info.relations ? this.props.user.info.relations.map((index, key) => {
          return <ChildItem key={key} data={index} />
        })
        : null }
        <Link {...cta} to={'/createChild'}>Create child</Link>
        </span>
        <a {...cta} onClick={this.props.showCreateModal}>+ Tell a story</a>
        <div {...userActions}>
          <Link to={`/user/${this.props.user.info.id}`} {...cta}>Me</Link>
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
  persistLogin: () => dispatch(userPersistLogin()),
  showCreateModal: () => dispatch(modalShowPostCreateItem())
 }
})(MenuApp);