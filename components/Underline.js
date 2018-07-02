import React, { PureComponent } from 'react'
import rough from 'roughjs-es5'

import fitViewBox from '../functions/fitViewBox'

export default class Underline extends PureComponent {
  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.renderSvg()
  }

  renderSvg() {
    this.drawUnderline()
  }

  drawUnderline() {
    const max = 50

    const lineNode = this.rc.line(0, 0, max, 0, {
      strokeWidth: 2,
    })

    this.svg.appendChild(lineNode)

    fitViewBox({
      nodes: lineNode,
      svg: this.svg,
    })

    this.svg.setAttribute('width', '1em')
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