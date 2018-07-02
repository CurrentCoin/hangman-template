import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Letter from './Letter'

export default class Word extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: '',
  }

  render() {
    const {
      text,
    } = this.props

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {
          Array.from(text).map((letter, index) => {
            return <Letter letter={letter} key={index} />
          })
        }
      </div>
    )
  }
}
