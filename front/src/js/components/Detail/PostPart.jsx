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

const img = css({
  width:  '100%',
  float: 'left'
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
    console.log( this.props.data.type)
    return (
      <div {...postPart}>
        <UserBadgeSmall data={{...this.props.data, userID: this.props.data.uuid}} />
         { this.props.data.type === 'TEXT' ? 
          <p {...p}>
            {this.props.data.content}
          </p>
          : 
          <img src={`${process.env.REACT_APP_API_URL}${this.props.data.content}`} {...img} />
        }
      </div>
    )
  }
}