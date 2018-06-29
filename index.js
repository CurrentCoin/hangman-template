import React, { Component } from 'react';
// import rough from 'roughjs'

import './index.css'
import letterPathsUpper from './MavenProBoldUpperPaths'
import letterPathsLower from './MavenProBoldLowerPaths'
import translatePath from './translatePath'
import Progress from './Progress'
import Word from './Word'
import Alphabet from './Alphabet'
import Prompt from './Prompt'

const chooseRandom = words => {
  const index = Math.floor(Math.random() * words.length)

  return words[index]
}

class App extends Component {
  constructor(props) {
    super(props)
    const { secretWords } = props
    const words = secretWords.split(',').map(word => word.trim())
    const secretWord = chooseRandom(words).toUpperCase()

    this.state = {
      guesses: '',
      secretWord,
    }

    // this.initializeProperties()
  }

  initializeProperties() {
    const { props } = this

    const { secretWords } = props

    const words = secretWords.split(',').map(word => word.trim())

    const secretWord = chooseRandom(words).toUpperCase()

    this.setState({
      secretWord
    })

    // if (props.theme === 'a') {
    //   this.color1 = 'black'
    //   this.color2 = 'rgba(0, 0, 0, 0.3)'
    // } else if (props.theme === 'b') {
    //   this.color1 = 'blue'
    //   this.color2 = 'rgba(255, 0, 0, 0.3)'
    // }
    //
    // if (props.alphabet === 'lower') {
    //   this.letterPaths = letterPathsLower
    // } else {
    //   this.letterPaths = letterPathsUpper
    // }
  }

  initialize() {
    this.initializeProperties()
  }

  componentDidMount() {
    // this.initialize()
  }

  componentWillReceiveProps() {
    this.receivedNewProps = true
  }

  componentDidUpdate() {
    if (this.receivedNewProps) {
      // this.reinitialize()
    }

    this.receivedNewProps = false
  }

  reinitialize = () => {

    this.setState({
      guesses: ''
    })

    this.initialize()
  }

  onGuess = (letter) => {
    if (!this.state.guesses.includes(letter)) {
      this.setState(previousState => ({
        guesses: previousState.guesses.concat(letter)
      }))
    }
  }

  isGameOver() {
    if (this.state.guesses.length >= this.props.guesses) {
      return true
    } else {
      return false
    }
  }

  GameOverPrompt = localProps => {
    const { numberOfIncorrectGuessesAllowed } = this.props

    if (this.hasGuessedWord()) {
      return (
        <div className='Hangman-Prompt-wrapper'>
          <Prompt
            text='You guessed it!'
            buttonText='Play Again'
            buttonClick={this.reinitialize}
          />
        </div>
      )
    } else if (this.incorrectGuesses() >= numberOfIncorrectGuessesAllowed) {
      return (
        <div className='Hangman-Prompt-wrapper'>
          <Prompt
            text='You ran out of guesses'
            buttonText='Play Again'
            buttonClick={this.reinitialize}
          />
        </div>
      )
    } else {
      return null
    }
  }

  hasGuessedWord = () => {
    const { guesses, secretWord } = this.state

    return Array.from(secretWord).every(letter => {
      return guesses.includes(letter)
    })
  }

  incorrectGuesses = () => {
    const { secretWord } = this.state
    let count = 0

    Array.from(this.state.guesses).forEach(letter => {
      if (!secretWord.includes(letter)) {
        count++
      }
    })

    return count
  }

  render() {
    const { secretWord } = this.state

    const word = Array.from(secretWord).map(letter => {
      return this.state.guesses.includes(letter)
        ? letter
        : '-'
    }).join('')

    const { GameOverPrompt } = this

    return (
      <div className='Hangman-wrapper'>
        <Progress incorrectGuesses={this.incorrectGuesses()} />
        <Word word={word} />
        <Alphabet
          onGuess={this.onGuess}
          guesses={this.state.guesses}
        />
        <GameOverPrompt />
      </div>
    )
  }
}

export default App;
