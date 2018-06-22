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

class App extends Component {
  constructor(props) {
    super(props)

    const { secretWords } = props

    const words = secretWords.split(',').map(word => word.trim())

    const secretWord = chooseRandom(words).toUpperCase()

    this.state = {
      secretWord,
      guesses: '',
    }

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
  }

  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.initialize()
  }

  initialize() {
    this.drawDashes()
    this.drawBase()
    this.drawAlphabet()
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
    Array.from(this.state.secretWord).forEach((letter, index) => {
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

      if (this.state.secretWord.includes(letter)) {
        this.fillInLetter(letter)
        this.checkWin()
      } else {
        this.drawPerson()
      }
    }
  }

  checkWin() {
    if (
      Array.from(this.state.secretWord).every(letter => {
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
    if (condition === 'win') {
      setTimeout(() => alert('You Win!'), 1000)
    } else {
      setTimeout(() => alert('you lose...'), 1000)
    }
  }

  drawPerson() {
    let incorrectGuesses = 0

    Array.from(this.state.guesses).forEach(letter => {
      if (!this.state.secretWord.includes(letter)) {
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
    Array.from(this.state.secretWord).forEach((letter, index) => {
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
      letter: this.state.secretWord[index],
      x,
      y,
    })
  }

  drawLetter({ letter, x, y, onClick }) {
    const path = this.letterPaths[letter]

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

    this.svg.appendChild(letterNode)
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
    return (
      <svg
        className='Hangman-svg'
        ref={ref => this.svg = ref}
      >
      </svg>
    )
  }
}

export default App;
