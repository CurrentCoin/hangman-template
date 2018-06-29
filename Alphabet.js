import React, { Component } from 'react'
import rough from 'roughjs'

import letterPaths from './MavenProBoldUpperPaths'
import translatePath from './translatePath'

const clearNode = node => {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

export default class Alphabet extends Component {
  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.padding = 15

    this.letterCircleRadius = 23
    this.circleSpacing = 5
    this.circleOffset = 8

    this.globalFontOffsetY = 25

    this.renderSvg()
  }

  componentDidUpdate() {
    this.renderSvg()
  }

  renderSvg() {
    const currentGuesses = this.props.guesses
    let previousGuesses = this.previousGuesses

    if(currentGuesses === previousGuesses) {
      return
    }

    if (
      previousGuesses === undefined
        || previousGuesses.length > currentGuesses.length
    ) {
      clearNode(this.svg)
      this.drawAlphabet()
      previousGuesses = ''
    }

    Array.from(currentGuesses).forEach(letter => {
      if (!previousGuesses.includes(letter)) {
        this.drawX(letter)
      }
    })

    this.previousGuesses = currentGuesses
  }

  drawX(letter) {
    const waveLength = this.letterCircleRadius * 2 + this.circleSpacing
    const diameter = this.letterCircleRadius * 2
    const { circleOffset, padding } = this

    const index = letter.charCodeAt(0) - 65

    const x = (index % 9) * waveLength + padding - circleOffset
    const y = Math.floor(index / 9) * waveLength + padding + circleOffset + this.globalFontOffsetY

    const line1 = this.rc.line(x, y, x + diameter, y - diameter, {
      strokeWidth: 1,
    })
    const line2 = this.rc.line(x, y - diameter, x + diameter, y, {
      strokeWidth: 1,
    })

    this.svg.appendChild(line1)
    this.svg.appendChild(line2)
  }

  drawAlphabet() {
    const waveLength = this.letterCircleRadius * 2 + this.circleSpacing

    for (let index = 0; index < 26; index++) {
      this.drawCircleLetter({
        letter: String.fromCharCode(index + 65),
        x: (index % 9) * waveLength + this.padding,
        y: Math.floor(index / 9) * waveLength + this.padding + this.globalFontOffsetY,
      })
    }
  }

  drawCircleLetter({ letter, x, y }) {
    const onClick = () => this.props.onGuess(letter)

    this.drawCircle({ letter, x, y, onClick })
    this.drawLetter({ letter, x, y, onClick })
  }

  drawCircle({ letter, x, y, onClick }) {
    const radius = this.letterCircleRadius
    const centerOffset = radius - this.circleOffset
    const circleNode = this.rc.circle(x + centerOffset, y - centerOffset, 2 * radius, {
      fill: 'white',
      // stroke: this.color2,
      fillStyle: 'solid',
    })

    circleNode.addEventListener('click', onClick)

    this.svg.appendChild(circleNode)
  }

  drawLetter({
    letter,
    x,
    y,
    onClick,
  }) {
    const path = letterPaths[letter.toUpperCase()]

    const newPath = translatePath({
      path,
      x: x,
      y: y,
    })

    const letterNode = this.rc.path(newPath, {
      simplification: 3,
      // stroke: this.color1,
    })

    letterNode.addEventListener('click', onClick)

    this.svg.appendChild(letterNode)
  }

  render() {
    return (
      <svg
        className='Hangman-Alphabet-svg'
        ref={ref => this.svg = ref}
      >
      </svg>
    )
  }
}
