import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs-es5'

import fitViewBox from '../functions/fitViewBox'
import themes from '../themes'
import clearNode from '../functions/clearNode'

export default class Ex extends PureComponent {
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
    this.drawEx()
  }

  drawEx() {
    const max = 40

    const { exColor } = themes[this.props.theme]

    const style = {
      stroke: exColor,
      strokeWidth: 5,
      roughness: 5,
    }

    const lineNode1 = this.rc.line(0, 0, max, max, style)
    const lineNode2 = this.rc.line(0, max, max, 0, style)

    this.svg.appendChild(lineNode1)
    this.svg.appendChild(lineNode2)

    fitViewBox({
      nodes: [lineNode1, lineNode2],
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
