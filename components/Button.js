import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Words from './Words'
import Rectangle from './Rectangle'

export default class Button extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    theme: PropTypes.string,
  }

  static defaultProps = {
    text: 'click',
  }

  render() {
    const {
      onClick,
      text,
      theme,
    } = this.props

    return (
      <div
        onClick={onClick}
        style={{
          fontSize: '0.5em',
        }}
      >
        <Rectangle
          theme={theme}
        >
          <Words
            text={text}
            theme={theme}
          />
        </Rectangle>
      </div>
    )
  }
}
