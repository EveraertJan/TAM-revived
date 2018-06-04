
import React, { Component } from 'react';
import { css } from 'glamor'
import CreateChildForm from './CreateChildForm.jsx'
import MenuApp from './../Menu/MenuApp'

const createChildContainer = css({
  width: '300px',
  position: 'absolute',
  top: 'calc(50% - 250px)',
  left: 'calc(60% - 150px)',
  padding: '20px',
  boxSizing: 'border-box'
})

export default class CreateChildApp extends Component {
  render() {
    return (
      <span>
        <div {...createChildContainer}>
          <CreateChildForm />
        </div>
        <MenuApp />
      </span>
    )
  }
}