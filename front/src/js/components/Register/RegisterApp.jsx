
import React, { Component } from 'react';
import { css } from 'glamor'
import RegisterForm from './RegisterForm'

const registerContainer = css({
  width: '300px',
  position: 'absolute',
  top: 'calc(50% - 250px)',
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

export default class RegisterApp extends Component {
  render() {
    return (
      <span>
        <div {...imageContainer}>

        </div>
        <div {...registerContainer}>
          <RegisterForm />
        </div>
      </span>
    )
  }
}