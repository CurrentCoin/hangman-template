import React, { Component } from 'react'
import rough from 'roughjs'

import letterPaths from './MavenProBoldUpperPaths'
import translatePath from './translatePath'

const clearNode = node => {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

const countLetters = word => {
  return Array.from(word).reduce((count, letter) => {
    return letter !== '-'
      ? count + 1
      : count
  }, 0)
}

const mustBeReset = (previousWord, currentWord) => {
  if (!previousWord) {
    return true
  }

  if (previousWord.length !== currentWord.length) {
    return true
  }

  if (countLetters(previousWord) > countLetters(currentWord)) {
    return true
  }

  // if previousWord not subset of currentWord
}

export default class Word extends Component {
  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.padding = 15
    this.letterOffset = -5

    const style = getComputedStyle(this.svg)

    this.height = Number(style.height.slice(0, -2))

    this.dashWidth = 30
    this.dashSpacing = 10

    this.svg.style.width =
      this.props.word.length * (this.dashWidth + this.dashSpacing)
      + (2 * this.padding)

    this.renderSvg()
  }

  componentDidUpdate() {
    this.renderSvg()
  }

  renderSvg() {
    const currentWord = this.props.word
    let previousWord = this.previousWord

    if (currentWord === previousWord)
      return

    if (mustBeReset(previousWord, currentWord)) {
      clearNode(this.svg)
      this.drawDashes()
      previousWord = '-'.repeat(currentWord.length)
    }

    Array.from(currentWord).forEach((letter, index) => {
      if (
        letter !== '-'
          && previousWord.charAt(index) !== currentWord.charAt(index)
      ) {
        this.drawLetter({ letter, index })
      }
    })

    this.previousWord = currentWord
  }

  drawDashes() {
    Array.from(this.props.word).forEach((letter, index) => {
      this.drawDash(index)
    })
  }

  drawDash(index) {
    const width = this.dashWidth
    const space = this.dashSpacing
    const y = this.height - this.padding
    const x = index * (width + space) + this.padding

    const node = this.rc.line(x, y, x + width, y)

    this.svg.appendChild(node)
  }

  drawLetter({
    letter,
    index,
  }) {
    const width = this.dashWidth
    const space = this.dashSpacing
    const y = this.height - this.padding + this.letterOffset
    const x = index * (width + space) + this.padding

    const path = letterPaths[letter.toUpperCase()]

    const newPath = translatePath({
      path,
      x,
      y,
    })

    const letterNode = this.rc.path(newPath, {
      simplification: 3,
      // stroke: this.color1,
    })

    this.svg.appendChild(letterNode)
  }

  render() {
    return (
      <svg
        className='Hangman-Word-svg'
        ref={ref => this.svg = ref}
      >
      </svg>
    )
  }
}
