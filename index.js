import React, { Component } from 'react';
import rough from 'roughjs'

import './index.css'
import letterPathsUpper from './MavenProBoldUpperPaths'
import letterPathsLower from './MavenProBoldLowerPaths'
import translatePath from './translatePath'

const chooseRandom = words => {
  const index = Math.floor(Math.random() * words.length)

  return words[index]
}

const clearNode = node => {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

class App extends Component {
  state = {
    guesses: '',
  }

  initialize() {
    const { props } = this

    const { secretWords } = props

    const words = secretWords.split(',').map(word => word.trim())

    this.secretWord = chooseRandom(words).toUpperCase()

    if (props.theme === 'a') {
      this.color1 = 'black'
      this.color2 = 'rgba(0, 0, 0, 0.3)'
    } else if (props.theme === 'b') {
      this.color1 = 'blue'
      this.color2 = 'rgba(255, 0, 0, 0.3)'
    }

    if (props.alphabet === 'lower') {
      this.letterPaths = letterPathsLower
    } else {
      this.letterPaths = letterPathsUpper
    }

    this.rc = rough.svg(this.svg)

    this.baseX = 200
    this.baseY = 20
    this.baseWidth = 100
    this.baseHeight = 100

    this.dashX = 100
    this.dashY = 200
    this.dashWidth = 30
    this.dashSpacing = 10

    this.alphabetX = 30
    this.alphabetY = 280

    this.letterCircleRadius = 23
    this.circleSpacing = 5
    this.circleOffset = 8

    this.boardLetterOffset = 5

    this.textLetterSpacing = 25

    this.drawDashes()
    this.drawBase()
    this.drawAlphabet()
  }

  componentDidMount() {
    this.initialize()
  }

  componentWillReceiveProps() {
    this.receivedNewProps = true
  }

  componentDidUpdate() {
    if (this.receivedNewProps) {
      this.reinitialize()
    }

    this.receivedNewProps = false
  }

  reinitialize() {
    clearNode(this.svg)

    this.setState({
      guesses: ''
    })

    this.initialize()
  }

  drawDash(index) {
    const width = this.dashWidth
    const space = this.dashSpacing
    const y = this.dashY
    const x = index * (width + space) + this.dashX

    const node = this.rc.line(x, y, x + width, y)

    this.svg.appendChild(node)
  }

  drawDashes() {
    Array.from(this.secretWord).forEach((letter, index) => {
      this.drawDash(index)
    })
  }

  drawBase() {
    const { rc, svg } = this
    const x = this.baseX
    const y = this.baseY
    const width = this.baseWidth
    const height = this.baseHeight

    const centerX = x + (width / 2)

    const bottomLine = rc.line(x, y + height, x + width, y + height)
    const centerLine = rc.line(centerX, y, centerX, y + height)
    const topLine = rc.line(x, y, centerX, y)
    const leftLine = rc.line(x, y, x, y + (height / 4))

    svg.appendChild(bottomLine)
    svg.appendChild(centerLine)
    svg.appendChild(topLine)
    svg.appendChild(leftLine)
  }

  drawClickableLetter({ letter, x, y }) {
    const onClick = () => this.guess(letter)

    this.drawCircle({ letter, x, y, onClick })
    this.drawLetter({ letter, x, y, onClick })
  }

  drawCircle({ letter, x, y, onClick }) {
    const radius = this.letterCircleRadius
    const centerOffset = radius - this.circleOffset
    const circleNode = this.rc.circle(x + centerOffset, y - centerOffset, 2 * radius, {
      fill: 'white',
      stroke: this.color2,
      fillStyle: 'solid',
    })

    circleNode.addEventListener('click', onClick)

    this.svg.appendChild(circleNode)
  }

  guess(letter) {
    if (!this.state.guesses.includes(letter)) {
      this.setState({
        guesses: this.state.guesses.concat(letter)
      })

      this.crossOutLetter(letter)

      if (this.secretWord.includes(letter)) {
        this.fillInLetter(letter)
        this.checkWin()
      } else {
        this.drawPerson()
      }
    }
  }

  checkWin() {
    if (
      Array.from(this.secretWord).every(letter => {
        return this.state.guesses.includes(letter)
      })
    ) {
      this.win()
    }
  }

  win() {
    this.end('win')
  }

  lose() {
    this.end('lose')
  }

  end(condition) {
    const text = condition === 'win'
      ? 'You guessed it!'
      : 'You ran out of guesses'

    const buttonText = 'Play again'
    const onClick = this.reinitialize.bind(this)

    setTimeout(() => this.prompt({
      text,
      buttonText,
      onClick,
    }), 500)
  }

  prompt({
    text,
    buttonText,
    onClick,
  }) {
    this.gameOverWrapper.classList.remove('Hangman-hidden')

    const svg = this.gameOverSvg

    const buttonClick = () => {
      this.gameOverWrapper.classList.add('Hangman-hidden')
      clearNode(svg)
      onClick()
    }

    this.drawText({
      text,
      x: 50,
      y: 50,
      svg,
    })

    this.drawButton({
      text: buttonText,
      x: 100,
      y: 150,
      onClick: buttonClick,
      svg,
    })
  }

  drawText({
    text,
    x,
    y,
    onClick,
    svg,
  }) {
    Array.from(text).forEach((letter, index) => {
      const space = this.textLetterSpacing
      const letterX = index * space + x

      this.drawLetter({
        letter,
        x: letterX,
        y,
        onClick,
        svg,
      })
    })
  }

  drawButton({
    text,
    x,
    y,
    onClick,
    svg,
  }) {
    const cs = getComputedStyle(svg)

    console.log('cs:', cs)

    const { rc } = this
    const width = 50
    const height = 20

    const rectangle = rc.rectangle(x, y, width, height, {
      fill: 'white',
      fillStyle: 'solid',
    })

    rectangle.addEventListener('click', onClick)

    svg.appendChild(rectangle)
  }

  drawPerson() {
    let incorrectGuesses = 0

    Array.from(this.state.guesses).forEach(letter => {
      if (!this.secretWord.includes(letter)) {
        incorrectGuesses++
      }
    })

    switch (incorrectGuesses) {
      case 1:
        this.drawHead()
        break;
      case 2:
        this.drawTorso()
        break;
      case 3:
        this.drawLeftArm()
        break;
      case 4:
        this.drawRightArm()
        break;
      case 5:
        this.drawLeftLeg()
        break;
      case 6:
        this.drawRightLeg()
        if (this.props.guesses === '6')
          this.lose()
        break;
      case 7:
        this.drawLeftEye()
        break;
      case 8:
        this.drawRightEye()
        this.lose()
        break;
      default:
    }
  }

  drawLeftEye() {
    this.drawEye('left')
  }

  drawRightEye() {
    this.drawEye('right')
  }

  drawEye(side) {
    const { rc, svg } = this
    const height = this.baseHeight
    const x = side === 'left'
      ? this.baseX - (height / 32)
      : this.baseX + (height / 32)

    const y = this.baseY + (height * 5 / 16)
    const diameter = height / 128

    const circle = rc.circle(x, y, diameter)

    svg.appendChild(circle)
  }

  drawHead() {
    const { rc, svg } = this
    const x = this.baseX
    const y = this.baseY
    const height = this.baseHeight
    const radius = height / 16

    const circle = rc.circle(x, y + (height / 4) + radius, radius * 2)

    svg.appendChild(circle)
  }

  drawTorso() {
    const { rc, svg } = this
    const height = this.baseHeight
    const x = this.baseX
    const y = this.baseY + (height * 3 / 8)
    const torsoLength = height / 4

    const line = rc.line(x, y, x, y + torsoLength)

    svg.appendChild(line)
  }

  drawLeftArm() {
    this.drawArm('left')
  }

  drawRightArm() {
    this.drawArm('right')
  }

  drawArm(side) {
    const { rc, svg } = this
    const width = this.baseWidth
    const height = this.baseHeight
    const x = this.baseX
    const y = this.baseY + (height / 2)
    const armLength = width / 8
    const armEndX = side === 'left' ? x - armLength : x + armLength

    const arm = rc.line(x, y, armEndX, y)

    svg.appendChild(arm)
  }

  drawLeftLeg() {
    this.drawLeg('left')
  }

  drawRightLeg() {
    this.drawLeg('right')
  }

  drawLeg(side) {
    const { rc, svg } = this
    const width = this.baseWidth
    const height = this.baseHeight
    const x = this.baseX
    const y = this.baseY + (height * 5 / 8)
    const armLength = width / 8
    const legEndX = side === 'left' ? x - armLength : x + armLength
    const legEndY = y + armLength

    const leg = rc.line(x, y, legEndX, legEndY)

    svg.appendChild(leg)
  }

  crossOutLetter(letter) {
    const waveLength = this.letterCircleRadius * 2 + this.circleSpacing

    const index = letter.charCodeAt(0) - 65

    this.drawX({
      x: (index % 9) * waveLength + this.alphabetX,
      y: Math.floor(index / 9) * waveLength + this.alphabetY,
    })
  }

  drawX({ x, y }) {
    const { rc, svg } = this
    const diameter = this.letterCircleRadius * 2
    const centerOffset = this.circleOffset

    x -= centerOffset
    y += centerOffset

    const line1 = rc.line(x, y, x + diameter, y - diameter, {
      strokeWidth: 1,
    })
    const line2 = rc.line(x, y - diameter, x + diameter, y, {
      strokeWidth: 1,
    })

    svg.appendChild(line1)
    svg.appendChild(line2)
  }

  fillInLetter(guessedLetter) {
    Array.from(this.secretWord).forEach((letter, index) => {
      if (letter === guessedLetter) {
        this.drawBoardLetter(index)
      }
    })
  }

  drawBoardLetter(index) {
    const width = this.dashWidth
    const space = this.dashSpacing
    const y = this.dashY - this.boardLetterOffset
    const x = index * (width + space) + this.dashX

    this.drawLetter({
      letter: this.secretWord[index],
      x,
      y,
    })
  }

  drawLetter({
    letter,
    x,
    y,
    onClick,
    svg,
  }) {
    svg = svg || this.svg

    const path = this.letterPaths[letter.toUpperCase()]

    const newPath = translatePath({
      path,
      x: x || 0,
      y: y || 0,
    })

    const letterNode = this.rc.path(newPath, {
      simplification: 3,
      stroke: this.color1,
    })

    if (onClick) {
      letterNode.addEventListener('click', onClick)
    }

    svg.appendChild(letterNode)
  }

  drawAlphabet() {
    const waveLength = this.letterCircleRadius * 2 + this.circleSpacing

    for (let index = 0; index < 26; index++) {
      this.drawClickableLetter({
        letter: String.fromCharCode(index + 65),
        x: (index % 9) * waveLength + this.alphabetX,
        y: Math.floor(index / 9) * waveLength + this.alphabetY,
      })
    }
  }

  render() {
    return ([
      <div key='1' className='Hangman-wrapper'>
        <svg
          className='Hangman-svg'
          ref={ref => this.svg = ref}
        >
        </svg>
      </div>,
      <div
        key='2'
        className='Hangman-game-over-wrapper Hangman-hidden'
        ref={ref => this.gameOverWrapper = ref}
      >
        <svg
          className='Hangman-game-over-svg'
          ref={ref => this.gameOverSvg = ref}
        >
        </svg>
      </div>
    ])
  }
}

export default App;
