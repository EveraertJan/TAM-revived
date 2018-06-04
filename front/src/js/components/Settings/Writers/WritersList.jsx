import React, { Component } from 'react';
import { connect } from 'react-redux'
import { css } from 'glamor'
import WritersItem from './WritersItem'

import { settingsGetWriters } from './../../../actions/SettingsActions'

const header = css({
  fontWeight: 'bold'
})

class WritersList extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    console.log(this.props.user.detail.uuid)
    this.props.getWriters(this.props.user.detail.uuid)
  }

  render() {
    return (
      <tbody>
        <tr {...header}>
          <td>Name</td>
          <td>Role</td>
          <td>Actions</td>
        </tr>
        { this.props.settings.writers.map((index, key) => {
          return <WritersItem key={key} data={index} />
        })}
      </tbody>
    )
  }
}

export default connect((state) => {
  return {
    user: state.user,
    settings: state.settings
  }
},
(dispatch) => {
  return {
    getWriters: (data) => dispatch(settingsGetWriters(data))
  }
})(WritersList)