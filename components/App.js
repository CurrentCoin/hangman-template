import React, { Component } from 'react';

import Alphabet from './Alphabet'
import Progress from './Progress'
import SecretWord from './SecretWord'
import Prompt from './Prompt'

import './App.css'

import chooseRandom from '../functions/chooseRandom'

export default class App extends Component {
  constructor(props) {
    super(props)

    const { randomWord } = this

    this.state = {
      guesses: '',
      secretWord: randomWord,
    }
  }

  restart = () => {
    const { randomWord } = this

    this.setState({
      guesses: '',
      secretWord: randomWord
    })
  }

  guess = letter => {
    if (!this.state.guesses.includes(letter)) {
      this.setState(previousState => ({
        guesses: previousState.guesses.concat(letter)
      }))
    }
  }

  get randomWord() {
    const { secretWords } = this.props
    const words = secretWords.split(',').map(word => word.trim())
    const secretWord = chooseRandom(words).toUpperCase()

    return secretWord
  }

  get lost() {
    const { numberOfWrongGuesses } = this
    const { wrongGuesses: allowedNumberOfWrongGuesses } = this.props

    return numberOfWrongGuesses >= allowedNumberOfWrongGuesses
  }

  get won() {
    const { guesses, secretWord } = this.state

    return Array.from(secretWord).every(letter => {
      return guesses.includes(letter)
    })
  }

  get numberOfWrongGuesses() {
    const { secretWord } = this.state
    let count = 0

    Array.from(this.state.guesses).forEach(letter => {
      if (!secretWord.includes(letter)) {
        count++
      }
    })

    return count
  }

  get partialWordArray() {
    const { secretWord, guesses } = this.state

    return Array.from(secretWord).map(letter => {
      return guesses.includes(letter)
        ? letter
        : undefined
    })
  }

  render() {
    const {
      guess,
      numberOfWrongGuesses,
      partialWordArray,
      restart,
    } = this

    const { guesses } = this.state

    let lost = false
    let won = false

    if (this.lost) {
      lost = true
    } else if (this.won) {
      won = true
    }

    const propmtText = won
      ? 'You guessed it'
      : lost
        ? 'You ran out of guesses'
        : null

    return (
      <div className='Hangman-wrapper'>
        <Progress stage={numberOfWrongGuesses} />
        <SecretWord letters={partialWordArray} />
        <Alphabet
          crossedOut={guesses}
          onClick={guess}
        />
        <Prompt
          display={won || lost}
          text={propmtText}
          buttonText='play again'
          onClick={restart}
        />
      </div>
    )
  }
}
