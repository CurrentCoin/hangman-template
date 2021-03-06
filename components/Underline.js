import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs-es5'

import fitViewBox from '../functions/fitViewBox'
import themes from '../themes'
import clearNode from '../functions/clearNode'

export default class Underline extends PureComponent {
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
    this.drawUnderline()
  }

  drawUnderline() {
    const {
      lineColor,
    } = themes[this.props.theme]

    const max = 50

    const lineNode = this.rc.line(0, 0, max, 0, {
      strokeWidth: 2,
      stroke: lineColor,
    })

    this.svg.appendChild(lineNode)

    fitViewBox({
      nodes: lineNode,
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
