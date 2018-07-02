import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Letter from './Letter'

export default class Word extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    theme: PropTypes.object,
  }

  static defaultProps = {
    text: '',
  }

  render() {
    const {
      text,
      theme,
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
            return <Letter
              letter={letter}
              key={index}
              theme={theme}
            />
          })
        }
      </div>
    )
  }
}
