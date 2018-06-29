import React, { Component } from 'react'
import rough from 'roughjs'

import letterPaths from './MavenProBoldUpperPaths'
import translatePath from './translatePath'

const clearNode = node => {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

export default class Button extends Component {
  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.padding = 15
    this.letterSpacing = 25
    this.globalFontOffsetY = 25

    const style = getComputedStyle(this.svg)
    const { text } = this.props

    this.height = Number(style.height.slice(0, -2))
    this.width = text.length * this.letterSpacing + (4 * this.padding)

    this.svg.style.width = this.width

    this.renderSvg()
  }

  componentDidUpdate() {
    this.renderSvg()
  }

  renderSvg() {
    const currentText = this.props.text
    const currentOnClick = this.props.onClick

    const { previousText, previousOnClick } = this

    if (previousText === currentText && previousOnClick === currentOnClick)
      return

    clearNode(this.svg)

    this.drawRectangle()
    this.drawText()

    this.previousText = currentText
    this.previousOnClick = currentOnClick
  }

  drawRectangle() {
    const { rc, svg } = this
    const { onClick } = this.props
    const width = this.width - (2 * this.padding)
    const height = this.height - (2 * this.padding)
    const x = this.padding
    const y = this.padding

    const rectangle = rc.rectangle(x, y, width, height, {
      fill: 'white',
      fillStyle: 'solid',
    })

    rectangle.addEventListener('click', onClick)

    svg.appendChild(rectangle)
  }

  drawText() {
    const { text, onClick } = this.props

    Array.from(text).forEach((letter, index) => {
      const space = this.letterSpacing
      const x = index * space + (2 * this.padding)
      const y = (2 * this.padding) + this.globalFontOffsetY

      this.drawLetter({
        letter,
        x,
        y,
        onClick
      })
    })
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
      x,
      y,
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
        className='Hangman-Button-svg'
        ref={ref => this.svg = ref}
      >
      </svg>
    )
  }
}
