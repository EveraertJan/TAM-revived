import React, { Component } from 'react'
import { css } from 'glamor'
import { connect } from 'react-redux';

import { Field, reduxForm, formValueSelector } from 'redux-form'
import Textarea from "react-textarea-autosize";


import { postCreatePart } from './../../actions/PostActions'

const fieldGroup = css({
  marginTop: '100px',
  width: '100%'
})

const fieldCss = css({
  width: '100%',
  fontSize: '13px',
  color: '#444',
  padding: '5px'
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
const renderTextArea = (field) => (
  <div {...fieldGroup}>
    <Textarea {...fieldCss} {...field.input} />
  </div>
)



class postAddPart extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    const data = {
      content: this.props.fieldValues,
      creator: this.props.user.info.id,
      postID: this.props.posts.detail.data.uuid
    }
    this.props.createPart(data)
  }
  render() {
    return (
      <form>
        <div>
          <Field name="part" component={renderTextArea} />
        </div>
        <a type="submit" {...cta} className="primary" onClick={this.handleSubmit}>Add to the story</a>
      </form>
    )
  }
}


postAddPart = reduxForm({
  // a unique name for the form
  form: 'postAddPartForm'
})(postAddPart)

const selector = formValueSelector('postAddPartForm')

export default connect(
  (state) => {
    return {
      fieldValues: selector(state, 'part'),
      user: state.user,
      posts: state.posts
    };
  },
  (dispatch) => { 
    return {
      createPart: (data) => dispatch(postCreatePart(data))
    };
  }
)(postAddPart);