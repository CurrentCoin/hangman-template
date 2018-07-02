import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Letter from './Letter'
import Circle from './Circle'
import Ex from './Ex'

const wrapperStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default class CircledLetter extends PureComponent {
  static propTypes = {
    letter: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    crossedOut: PropTypes.bool,
    theme: PropTypes.string,
  }

  componentDidMount() {
    const {
      clientWidth: width,
      clientHeight: height,
    } = this.circle.svg

    this.wrapperDiv.style.height = `${height}px`
    this.wrapperDiv.style.width = `${width}px`
  }

  render() {
    const {
      onClick,
      letter,
      crossedOut,
      theme,
    } = this.props

    return (
      <div
        style={{
          position: 'relative',
        }}
        ref={ref => this.wrapperDiv = ref}
        onClick={onClick}
      >
        <Circle
          ref={ref => this.circle = ref}
          theme={theme}
        />
        <div style={wrapperStyle}>
          <Letter
            letter={letter}
            theme={theme}
          />
        </div>
        {
          crossedOut
            ? (
              <div style={wrapperStyle}>
                <Ex
                  theme={theme}
                />
              </div>
            )
            : null
        }
      </div>
    )
  }
}
