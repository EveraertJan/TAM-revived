
import React, { Component } from 'react';
import { css } from 'glamor'

const header = css({
  fontWeight: 'bold'
})
export default class WritersItem extends Component {
  render() {
    console.log(this.props.data.first_name)
    return (
      <tr>
        <td>{this.props.data.first_name !== 'unset' ? `${this.props.data.first_name} ${this.props.data.last_name}` : `${this.props.data.email}` }</td>
        <td>{this.props.data.role}</td>
        <td>Actions</td>
      </tr>
    )
  }
}