import React, {Component} from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'

const userBadgeContainer = css({
  width: '200px',
  height: '30px',
  float: 'left'
})

const userImg = css({
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#ccc',
  float: 'left'
})

const userName = css({
  width: '170px',
  height: '30px',
  overflow: 'hidden',
  boxSizing: 'border-box',
  padding: '0px 10px',
  lineHeight: '30px',
  float: 'left'

})
export default class UserBadge extends Component {
  render() {
    return (
      <div {...userBadgeContainer}>
        <Link to={`/user/${this.props.data.userID}`}>
          <div {...userImg}>
            <img src={'#'} />
          </div>
          <div {...userName}>
            {this.props.data.first_name}&nbsp;{this.props.data.last_name}
          </div>
        </Link>
      </div>
    )
  }
}