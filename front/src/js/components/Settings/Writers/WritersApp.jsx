
import React, { Component } from 'react';
import { css } from 'glamor'
import WritersList from './WritersList'
import WritersForm from './WritersForm'

export default class WritersApp extends Component {
  render() {
    return (
      <div>
        <table>
          <WritersList />
          <WritersForm />
        </table>
      </div>
    )
  }
}