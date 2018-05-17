import React, { Component } from 'react'
import { css } from 'glamor'
import { connect } from 'react-redux';

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
const popup = css({

})

class ModalsApp extends Component {
  render() {
    return (
      <span>
        { this.props.utils.displayPostCreateItem ? 
          <div {...overlay}>
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
    };
  }
)(ModalsApp);