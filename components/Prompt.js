import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Words from './Words'
import Button from './Button'
import themes from '../themes'

export default class Prompt extends PureComponent {
  static propTypes = {
    display: PropTypes.bool,
    text: PropTypes.string,
    buttonText: PropTypes.string,
    onClick: PropTypes.func,
    theme: PropTypes.string,
  }

  static defaultProps = {
    display: true,
    text: '',
    buttonText: 'click',
    theme: 'a',
  }

  render() {
    const {
      display,
      text,
      buttonText,
      onClick,
      theme,
    } = this.props

    const {
      backgroundColor,
    } = themes[theme]

    if (!display) return null

    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            padding: '0.5em',
          }}
        >
          <Words
            text={text}
            theme={theme}
          />
          <Button
            text={buttonText}
            onClick={onClick}
            theme={theme}
          />
        </div>
      </div>
    )
  }
}
