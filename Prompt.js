import React, { Component } from 'react'

import Text from './Text'
import Button from './Button'

export default class Prompt extends Component {
  render() {
    const { text, buttonText, buttonClick } = this.props

    return (
      <div className='Hangman-Prompt'>
        <Text
          text={text}
        />
        <Button
          text={buttonText}
          onClick={buttonClick}
        />
      </div>
    )
  }
}
