import React, { Component } from 'react'
import { css } from 'glamor'
import { connect } from 'react-redux';
import AddImage from './../Common/AddImage'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import { postCreateItem } from './../../actions/PostActions'

const popup = css({
  width: '300px',
  padding: '10px',
  boxSizing: 'border-box',
  backgroundColor: '#fff',
  position: 'fixed',
  left: 'calc(50% - 150px)',
  top: 'calc(50% - 200px)',
})

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



class PostCreateModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    const data = {
      ...this.props.fieldValues,
      creator: this.props.user.info.id,
      subject: this.props.user.detail.uuid,
      media: this.props.file.image.data.uuid
    }
    this.props.createItem(data)
  }
  render() {
    return (
      <div {...popup}>
        <h4>Title of the post</h4>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <Field component={renderField} type="text" name="title" placeholder="title of the post" />
          </div>
          <AddImage />
          <a type="submit" {...cta} className="primary" onClick={this.handleSubmit}>Create post</a>
        </form>
             
      </div>
    )
  }
}


PostCreateModal = reduxForm({
  // a unique name for the form
  form: 'postCreateModal'
})(PostCreateModal)

const selector = formValueSelector('postCreateModal')

export default connect(
  (state) => {
    return {
      fieldValues: selector(state, 'title', 'about'),
      utils: state.utils,
      user: state.user,
      file: state.file
    };
  },
  (dispatch) => { 
    return {
      createItem: (data) => dispatch(postCreateItem(data))
    };
  }
)(PostCreateModal);