import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor'
import { settingsAddWriter } from './../../../actions/SettingsActions';
import { Field, reduxForm, formValueSelector } from 'redux-form'

const fieldGroup = css({
  '>input': {
    border: '1px solid #000',
    borderRadius: '0px',
    width: '100%'
  }
})

const cta = css({
  float: 'right',
  textDecoration: 'none',
  padding: '0px 10px',
  margin: '10px',
  marginTop: '22px',
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
  }
})


// outside your render() method
const renderField = (field) => (
  <div {...fieldGroup}>
    <input {...field.input} type={field.type} placeholder={field.placeholder} />
  </div>
)



class WritersForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    this.props.addWriter({...this.props.fieldValues, childID: this.props.user.detail.uuid})
  }
  render(){
    return(
      <tbody>
        <tr>
          <td>
            <label htmlFor="email">Email</label>
            <Field component={renderField} type="text" name="email" placeholder="john@doe.com" />
          </td>
          <td>
            <label htmlFor="role">Role</label>
            <Field component={renderField} type="text" name="role" placeholder="Godfather" />
          </td>
          <td>
            <a type="submit" {...cta} className="primary" onClick={this.handleSubmit}>add</a>
          </td>
        </tr>
      </tbody>
    )
  }
}

WritersForm = reduxForm({
  // a unique name for the form
  form: 'admin'
})(WritersForm)

const selector = formValueSelector('admin')

export default connect(state => {
  return {
    user: state.user,
    fieldValues: selector(state, 'email', 'role')
  }
}, dispatch => {
 return {
  addWriter: (data) => dispatch(settingsAddWriter(data))
 }
})(WritersForm);



