import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { css } from 'glamor'
// import { loginAction } from './../../actions/UserActions';
import { Field, reduxForm, formValueSelector } from 'redux-form'

import { userCreateChild } from './../../actions/UserActions'

const fieldGroup = css({
  '> input': {
    border: '1px solid #000',
    borderRadius: '0px',
    width: '100%',
    height: '40px',
    paddingLeft: '10px',
    boxSizing: 'border-box'
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



class CreateChildForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    this.props.createChild(this.props.fieldValues)
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
          <label htmlFor="date_of_birth">date_of_birth</label>
          <Field component={renderField} type="date" name="date_of_birth" placeholder="date_of_birth" />
        </div>
        <a type="submit" {...cta} className="primary" onClick={this.handleSubmit}>Create</a>
      </form>
    )
  }
}

CreateChildForm = reduxForm({
  // a unique name for the form
  form: 'createChild'
})(CreateChildForm)

const selector = formValueSelector('createChild')

export default connect(state => {
  return {
    fieldValues: selector(state, 'last_name', 'first_name', 'date_of_birth')
  }
}, dispatch => {
 return {
  createChild: (data) => dispatch(userCreateChild(data))
 }
})(CreateChildForm);



