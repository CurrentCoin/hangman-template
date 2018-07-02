import React, { PureComponent } from 'react'
import rough from 'roughjs'

import fitViewBox from '../functions/fitViewBox'

export default class Ex extends PureComponent {
  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.renderSvg()
  }

  renderSvg() {
    this.drawEx()
  }

  drawEx() {
    const max = 40

    const options = {
      strokeWidth: 5,
      stroke: 'red',
      roughness: 5,
    }

    const lineNode1 = this.rc.line(0, 0, max, max, options)
    const lineNode2 = this.rc.line(0, max, max, 0, options)

    this.svg.appendChild(lineNode1)
    this.svg.appendChild(lineNode2)

    fitViewBox({
      nodes: [lineNode1, lineNode2],
      svg: this.svg,
    })

    this.svg.setAttribute('height', '1em')
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
