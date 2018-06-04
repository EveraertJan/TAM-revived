import React, {Component} from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'

const userBadgeContainer = css({
  height: '30px',
  float: 'left',
  margin: '10px'
})

const userImg = css({
  width: '20px',
  height: '20px',
  margin: '5px',
  borderRadius: '50%',
  overflow: 'hidden',
  backgroundColor: '#ccc',
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
        </Link>
      </div>
    )
  }
}