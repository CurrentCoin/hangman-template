import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Letter from './Letter'
import Underline from './Underline'

export default class SecretWord extends Component {
  static propTypes = {
    letters: PropTypes.array.isRequired,
    theme: PropTypes.string,
  }

  render() {
    const { letters, theme } = this.props

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className='Hangman-SecretWord'
      >
        {
          letters.map((letter, index) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: '0.1em',
              }}
              key={index}
            >
              <Letter
                letter={letter || ' '}
                theme={theme}
              />
              <Underline
                theme={theme}
              />
            </div>
          ))
        }
      </div>
    )
  }
}
