import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Letter from './Letter'
import Underline from './Underline'

export default class SecretWord extends Component {
  static propTypes = {
    letters: PropTypes.array.isRequired
  }

  render() {
    const { letters } = this.props

    return (
      <div className='Hangman-SecretWord'>
        {
          letters.map((letter, index) => (
            <div
              className='Hangman-SecretWord-letter'
              key={index}
            >
              <Letter
                letter={letter || ' '}
              />
              <Underline />
            </div>
          ))
        }
      </div>
    )
  }
}
