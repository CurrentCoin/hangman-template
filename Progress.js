import React, { Component } from 'react'
import rough from 'roughjs'

const clearNode = node => {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}

// this component is not 100% stateless
export default class Progress extends Component {
  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.padding = 15

    const style = getComputedStyle(this.svg)

    this.height = Number(style.height.slice(0, -2))
    this.width = Number(style.width.slice(0, -2))

    this.drawBase()
  }

  reset() {
    clearNode(this.svg)
    this.drawBase()
  }

  componentDidUpdate() {
    switch (this.props.incorrectGuesses) {
      case 0:
        this.reset()
        break
      case 1:
        this.drawHead()
        break
      case 2:
        this.drawTorso()
        break
      case 3:
        this.drawLeftArm()
        break
      case 4:
        this.drawRightArm()
        break
      case 5:
        this.drawLeftLeg()
        break
      case 6:
        this.drawRightLeg()
        break
      case 7:
        this.drawLeftEye()
        break
      case 8:
        this.drawRightEye()
        break
      default:
    }
  }

  drawBase() {
    const { rc, svg } = this
    const width = this.width - (this.padding * 2)
    const height = this.height - (this.padding * 2)
    const x0 = this.padding
    const y0 = this.padding

    const centerX = x0 + (width / 2)

    const bottomLine = rc.line(x0, y0 + height, x0 + width, y0 + height)
    const centerLine = rc.line(centerX, y0, centerX, y0 + height)
    const topLine = rc.line(x0, y0, centerX, y0)
    const leftLine = rc.line(x0, y0, x0, y0 + (height / 4))

    svg.appendChild(bottomLine)
    svg.appendChild(centerLine)
    svg.appendChild(topLine)
    svg.appendChild(leftLine)
  }

  drawHead() {
    const { rc, svg } = this
    const height = this.height - (this.padding * 2)
    const radius = height / 16
    const x0 = this.padding
    const y0 = this.padding

    const circle = rc.circle(x0, y0 + (height / 4) + radius, radius * 2)

    svg.appendChild(circle)
  }

  drawTorso() {
    const { rc, svg } = this
    const width = this.width - (this.padding * 2)
    const height = this.height - (this.padding * 2)
    const x0 = this.padding
    const y0 = this.padding + (height * 3 / 8)
    const torsoLength = height / 4

    const line = rc.line(x0, y0, x0, y0 + torsoLength)

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
    const width = this.width - (this.padding * 2)
    const height = this.height - (this.padding * 2)
    const x0 = this.padding
    const y0 = this.padding + (height / 2)
    const armLength = width / 8
    const armEndX = side === 'left' ? x0 - armLength : x0 + armLength

    const arm = rc.line(x0, y0, armEndX, y0)

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
    const width = this.width - (this.padding * 2)
    const height = this.height - (this.padding * 2)
    const x0 = this.padding
    const y0 = this.padding + (height * 5 / 8)
    const armLength = width / 8
    const legEndX = side === 'left' ? x0 - armLength : x0 + armLength
    const legEndY = y0 + armLength

    const leg = rc.line(x0, y0, legEndX, legEndY)

    svg.appendChild(leg)
  }

  drawLeftEye() {
    this.drawEye('left')
  }

  drawRightEye() {
    this.drawEye('right')
  }

  drawEye(side) {
    const { rc, svg } = this
    const width = this.width - (this.padding * 2)
    const height = this.height - (this.padding * 2)
    const y0 = this.padding + (height * 5 / 16)
    const x0 = side === 'left'
      ? this.padding - (height / 32)
      : this.padding + (height / 32)
    const diameter = height / 128

    const circle = rc.circle(x0, y0, diameter)

    svg.appendChild(circle)
  }

  render() {
    return (
      <svg
        className='Hangman-Progress-svg'
        ref={ref => this.svg = ref}
      >
      </svg>
    )
  }
}
