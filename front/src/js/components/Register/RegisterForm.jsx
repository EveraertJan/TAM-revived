import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor'
// import { loginAction } from './../../actions/UserActions';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import { userRegisterAction } from './../../actions/UserActions'

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
  },
  '.secundary': {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    ':hover': {
      backgroundColor: '#eeeeee',
      color: '#333333'
    }

  }
})

const renderField = (field) => (
  <div {...fieldGroup}>
    <input {...field.input} type={field.type} placeholder={field.placeholder} />
  </div>
)



class RegsiterForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    this.props.register(this.props.fieldValues)
  }
  render(){
    console.log(this.props)
    return(
      <form>
        <div>
          <label htmlFor="first_name">Name</label>
          <Field component={renderField} type="text" name="first_name" placeholder="John" />
        </div>
        <div>
          <label htmlFor="lastName">Last name</label>
          <Field component={renderField} type="text" name="last_name" placeholder="Doe" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field component={renderField} type="text" name="email" placeholder="john@doe.com" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <Field component={renderField} type="password" name="password" placeholder="password" />
        </div>
        <a type="submit" {...cta} className="primary" onClick={this.handleSubmit}>Register</a>
        <Link to="/login" {...cta} className="secundary">Login</Link>
      </form>
    )
  }
}

RegsiterForm = reduxForm({
  // a unique name for the form
  form: 'register'
})(RegsiterForm)

const selector = formValueSelector('register')

export default connect(state => {
  return {
    fieldValues: selector(state, 'email', 'password', 'last_name', 'first_name')
  }
}, dispatch => {
 return {
  register: (data) => dispatch(userRegisterAction(data))
 }
})(RegsiterForm);



