import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs-es5'

import fitViewBox from '../functions/fitViewBox'
import themes from '../themes'
import clearNode from '../functions/clearNode'

export default class Circle extends PureComponent {
  static propTypes = {
    theme: PropTypes.string,
  }

  static defaultProps = {
    theme: 'a',
  }

  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.renderSvg()
  }

  componentDidUpdate() {
    clearNode(this.svg)
    this.renderSvg()
  }

  renderSvg() {
    this.drawCircle()
  }

  drawCircle() {
    const {
      circleOutlineColor,
      circleFill,
      circleFillColor,
    } = themes[this.props.theme]

    const style = {
      stroke: circleOutlineColor,
    }

    if (circleFill) {
      Object.assign(style, {
        fill: circleFillColor,
        roughness: 3,
        fillStyle: 'cross-hatch',
      })
    }

    const circleNode = this.rc.circle(0, 0, 50, style)

    this.svg.appendChild(circleNode)

    fitViewBox({
      node: circleNode,
      svg: this.svg,
    })
  }

  render() {
    return (
      <svg
        ref={ref => this.svg = ref}
      >
      </svg>
    )
  }
}
