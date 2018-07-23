import React, { Component } from 'react'
import { css } from 'glamor'
import { connect } from 'react-redux';

import { modalHidePostCreateItem } from './../../actions/UtilsActions'

import PostCreateModal from './PostCreateModal'

const overlay = css({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  position: 'fixed',
  left: '0px',
  top: '0px',
  zIndex: '1000'
})

class ModalsApp extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    console.log("hiding")
    this.props.hideModal();
  }
  render() {
    return (
      <span>
        { this.props.utils.displayPostCreateItem ? 
          <div {...overlay} onClick={this.handleClick}>
            <PostCreateModal /> 
          </div>
        : null }
      </span>
    )
  }
}



export default connect(
  (state) => {
    return {
      utils: state.utils
    };
  },
  (dispatch) => {
    return {
      hideModal: () => dispatch( modalHidePostCreateItem() )
    };
  }
)(ModalsApp);