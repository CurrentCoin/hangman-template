import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs-es5'

import themes from '../themes'

export default class Progress extends PureComponent {
  static propTypes = {
    stage: PropTypes.number,
    theme: PropTypes.string,
  }

  static defaultProps = {
    stage: 0,
    theme: 'a',
  }

  state = {}

  static getDerivedStateFromProps(props, state) {
    const {
      stage,
      theme,
    } = props

    const {
      stage: previousStage,
      theme: previousTheme,
    } = state

    const alreadyDrawnStage =
      theme !== previousTheme || previousStage === undefined
        ? -1
        : stage < previousStage
          ? 0
          : previousStage

    return {
      stage,
      theme,
      alreadyDrawnStage,
    }
  }

  componentDidMount() {
    this.rc = rough.svg(this.svg)

    const style = getComputedStyle(this.svg)

    this.width = Number(style.width.slice(0, -2))
    this.height = this.width
    this.padding = this.width / 10

    this.renderSvg()
  }

  componentDidUpdate() {
    this.renderSvg()
  }

  clearProgress = () => {
    const {
      svg,
      state: {
        alreadyDrawnStage,
      },
    } = this

    while(svg.lastChild && Number(svg.lastChild.id) !== alreadyDrawnStage) {
      svg.removeChild(svg.lastChild)
    }
  }

  renderSvg() {
    const {
      progressColor,
      lineColor,
    } = themes[this.props.theme]

    this.style = {
      stroke: progressColor || lineColor,
    }

    const {
      props: {
        stage,
      },
      state: {
        alreadyDrawnStage,
      },
      drawStage,
      clearProgress,
    } = this

    clearProgress(alreadyDrawnStage)

    let stageIndex = alreadyDrawnStage + 1

    while (stageIndex <= stage) {
      drawStage[stageIndex]()
      stageIndex++
    }
  }

  drawBase = stage => {
    const { rc, svg, style } = this
    const width = this.width - (this.padding * 2)
    const height = this.height - (this.padding * 2)
    const x0 = this.padding
    const y0 = this.padding

    const centerX = x0 + (width / 2)

    const bottomLine = rc.line(x0, y0 + height, x0 + width, y0 + height, style)
    const centerLine = rc.line(centerX, y0, centerX, y0 + height, style)
    const topLine = rc.line(x0, y0, centerX, y0, style)
    const leftLine = rc.line(x0, y0, x0, y0 + (height / 4), style)

    bottomLine.id = stage
    centerLine.id = stage
    topLine.id = stage
    leftLine.id = stage

    svg.appendChild(bottomLine)
    svg.appendChild(centerLine)
    svg.appendChild(topLine)
    svg.appendChild(leftLine)
  }

  drawHead = stage => {
    const { rc, svg, style } = this
    const height = this.height - (this.padding * 2)
    const radius = height / 16
    const x0 = this.padding
    const y0 = this.padding

    const circle = rc.circle(x0, y0 + (height / 4) + radius, radius * 2, style)

    circle.id = stage

    svg.appendChild(circle)
  }

  drawTorso = stage => {
    const { rc, svg, style } = this
    const height = this.height - (this.padding * 2)
    const x0 = this.padding
    const y0 = this.padding + (height * 3 / 8)
    const torsoLength = height / 4

    const line = rc.line(x0, y0, x0, y0 + torsoLength, style)

    line.id = stage

    svg.appendChild(line)
  }

  drawLeftArm = stage => {
    this.drawArm('left', stage)
  }

  drawRightArm = stage => {
    this.drawArm('right', stage)
  }

  drawArm = (side, stage) => {
    const { rc, svg, style } = this
    const width = this.width - (this.padding * 2)
    const height = this.height - (this.padding * 2)
    const x0 = this.padding
    const y0 = this.padding + (height / 2)
    const armLength = width / 8
    const armEndX = side === 'left' ? x0 - armLength : x0 + armLength

    const arm = rc.line(x0, y0, armEndX, y0, style)

    arm.id = stage

    svg.appendChild(arm)
  }

  drawLeftLeg = stage => {
    this.drawLeg('left', stage)
  }

  drawRightLeg = stage => {
    this.drawLeg('right', stage)
  }

  drawLeg = (side, stage) => {
    const { rc, svg, style } = this
    const width = this.width - (this.padding * 2)
    const height = this.height - (this.padding * 2)
    const x0 = this.padding
    const y0 = this.padding + (height * 5 / 8)
    const armLength = width / 8
    const legEndX = side === 'left' ? x0 - armLength : x0 + armLength
    const legEndY = y0 + armLength

    const leg = rc.line(x0, y0, legEndX, legEndY, style)

    leg.id = stage

    svg.appendChild(leg)
  }

  drawLeftEye = stage => {
    this.drawEye('left', stage)
  }

  drawRightEye = stage => {
    this.drawEye('right', stage)
  }

  drawEye = (side, stage) => {
    const { rc, svg, style } = this
    const height = this.height - (this.padding * 2)
    const y0 = this.padding + (height * 5 / 16)
    const x0 = side === 'left'
      ? this.padding - (height / 32)
      : this.padding + (height / 32)
    const diameter = height / 128

    const circle = rc.circle(x0, y0, diameter, style)

    circle.id = stage

    svg.appendChild(circle)
  }

  drawStage = {
    0: this.drawBase.bind(this, 0),
    1: this.drawHead.bind(this, 1),
    2: this.drawTorso.bind(this, 2),
    3: this.drawLeftArm.bind(this, 3),
    4: this.drawRightArm.bind(this, 4),
    5: this.drawLeftLeg.bind(this, 5),
    6: this.drawRightLeg.bind(this, 6),
    7: this.drawLeftEye.bind(this, 7),
    8: this.drawRightEye.bind(this, 8),
  }

  render() {
    return (
      <svg
        className='Hangman-Progress'
        ref={ref => this.svg = ref}
      >
      </svg>
    )
  }
}
