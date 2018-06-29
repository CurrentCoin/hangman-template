import React, { Component } from 'react'
import rough from 'roughjs'

import letterPaths from './MavenProBoldUpperPaths'
import translatePath from './translatePath'

const clearNode = node => {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

export default class Text extends Component {
  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.padding = 15
    this.letterSpacing = 25
    this.globalFontOffsetY = 25

    const style = getComputedStyle(this.svg)

    const { text } = this.props

    this.svg.style.width =
      text.length * this.letterSpacing + (2 * this.padding)

    this.renderSvg()
  }

  componentDidUpdate() {
    this.renderSvg()
  }

  renderSvg() {
    const currentText = this.props.text
    const { previousText } = this

    if (previousText === currentText)
      return

    clearNode(this.svg)

    this.drawText()

    this.previousText = currentText
  }

  drawText() {
    const { text } = this.props

    Array.from(text).forEach((letter, index) => {
      const space = this.letterSpacing
      const x = index * space + this.padding
      const y = this.padding + this.globalFontOffsetY

      this.drawLetter({
        letter,
        x,
        y,
      })
    })
  }

  drawLetter({
    letter,
    x,
    y,
  }) {
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
        className='Hangman-Text-svg'
        ref={ref => this.svg = ref}
      >
      </svg>
    )
  }
}
