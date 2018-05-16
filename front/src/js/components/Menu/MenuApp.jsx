
import React, { Component } from 'react';
import { css } from 'glamor'

const menuContainer = css({
  width: '500px',
  height: '50px',
  position: 'fixed',
  top: 'calc(100% - 70px)',
  left: 'calc(50% - 250px)'
})

export default class MenuApp extends Component {
  render() {
    return (
      <div {...menuContainer}>
        Tell about me
      </div>
    )
  }
}