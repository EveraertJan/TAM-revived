import React, { Component } from 'react';
import { css } from 'glamor'
import UserBadgeSmall from './../Common/UserBadgeSmall'


const postPart = css({
  padding: '10px',
  paddingLeft: '20px',
  boxSizing: 'border-box',
  marginTop: '10px',
  float: 'left',
  width: '100%'
})

const p = css({
  float: 'left',
  width: 'calc(100% - 50px)',
  display: 'flex',
  boxSizing: 'border-box',
  marginTop: '10px'
})
export default class PostPart extends Component {
  render() {
    return (
      <div {...postPart}>
        <UserBadgeSmall data={{...this.props.data, userID: this.props.data.uuid}} />
        <p {...p}>
          {this.props.data.content}
        </p>
      </div>
    )
  }
}