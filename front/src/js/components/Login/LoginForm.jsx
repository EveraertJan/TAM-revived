import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor'
// import { loginAction } from './../../actions/UserActions';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import { userLogInAction } from './../../actions/UserActions'

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

// outside your render() method
const renderField = (field) => (
  <div {...fieldGroup}>
    <input {...field.input} type={field.type} placeholder={field.placeholder} />
  </div>
)



class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    this.props.login(this.props.fieldValues)
  }
  render(){
    console.log(this.props)
    return(
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <Field component={renderField} type="text" name="username" placeholder="john@doe.com" />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <Field component={renderField} type="password" name="password" placeholder="password" />
          <Link to="forgotPassword">forgot password</Link>
        </div>
        <a type="submit" {...cta} className="primary" onClick={this.handleSubmit}>Log in</a>
        <Link to="register" {...cta} className="secundary">register</Link>
      </form>
    )
  }
}

LoginForm = reduxForm({
  // a unique name for the form
  form: 'login'
})(LoginForm)

const selector = formValueSelector('login')

export default connect(state => {
  return {
    fieldValues: selector(state, 'username', 'password')
  }
}, dispatch => {
 return {
  login: (data) => dispatch(userLogInAction(data))
 }
})(LoginForm);



