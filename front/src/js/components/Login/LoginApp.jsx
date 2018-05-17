
import React, { Component } from 'react';
import { css } from 'glamor'
import LoginForm from './LoginForm'

const loginContainer = css({
  width: '300px',
  position: 'absolute',
  top: 'calc(50% - 200px)',
  left: 'calc(60% - 150px)',
  padding: '20px',
  boxSizing: 'border-box'
})
const imageContainer = css({
  width: '40%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: '#eee',
  position: 'fixed',
  left: '0px',
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
export default class LoginApp extends Component {
  render() {
    return (
      <span>
        <div {...imageContainer}>

        </div>
        <div {...loginContainer}>
          <LoginForm />
        </div>
      </span>
    )
  }
}