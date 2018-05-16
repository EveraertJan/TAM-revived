import React, {Component} from 'React'
import { css } from 'glamor'

const formField = css({
  width: '100%'
})

export default class FormField extends Component {
  render() {
    return (
      <div {...formField}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input type={this.props.type || text} name={his.props.name} placeholder={this.props.placeholder || "Foo"} />
      </duv>
    )
  }
}