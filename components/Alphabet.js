import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import CircledLetter from './CircledLetter'

export default class Alphabet extends PureComponent {
  static propTypes = {
    crossedOut: PropTypes.string,
    onClick: PropTypes.func,
    theme: PropTypes.string,
  }

  static defaultProps = {
    crossedOut: '',
    onClick: () => {},
  }

  render() {
    const alphabetRange = Array(26).fill().map((_, index) => index + 65)
    const {
      onClick,
      theme,
    } = this.props
    const crossedOut = this.props.crossedOut.toUpperCase()

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
        className='Hangman-Alphabet'
      >
        {
          alphabetRange.map(number => {
            const letter = String.fromCharCode(number)

            return (
              <CircledLetter
                letter={letter}
                key={letter}
                crossedOut={crossedOut.includes(letter)}
                onClick={() => onClick(letter)}
                theme={theme}
              />
            )
          })
        }
      </div>
    )
  }
}
