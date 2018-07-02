import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs-es5'

import fitViewBox from '../functions/fitViewBox'
import themes from '../themes'

export default class Rectangle extends PureComponent {
  static propTypes = {
    children: PropTypes.element,
    theme: PropTypes.string,
  }

  static defaultProps = {
    children: (
      <div
        style={{
          height: '1em',
          width: '5em',
        }}
      ></div>
    ),
    theme: 'a',
  }

  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.renderSvg()
  }

  renderSvg() {
    this.drawRectangle()
  }

  drawRectangle() {
    const {
      clientWidth: width,
      clientHeight: height,
    } = this.childWrapper

    const {
      lineColor
    } = themes[this.props.theme]

    const rectangleNode = this.rc.rectangle(0, 0, width, height, {
      stroke: lineColor,
    })

    this.svg.appendChild(rectangleNode)

    fitViewBox({
      node: rectangleNode,
      svg: this.svg,
    })

    this.svg.setAttribute('height', `${height}px`)
    this.svg.setAttribute('width', `${width}px`)
  }

  render() {
    return (
      <div
        style={{
          position: 'relative',
        }}
      >
        <svg
          ref={ref => this.svg = ref}
          height='1em'
          width='1em'
        >
        </svg>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          ref={ref => this.childWrapper = ref}
        >
          { this.props.children }
        </div>
      </div>
    )
  }
}
