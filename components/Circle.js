import React, { PureComponent } from 'react'
import rough from 'roughjs-es5'

import fitViewBox from '../functions/fitViewBox'

export default class Circle extends PureComponent {
  componentDidMount() {
    this.rc = rough.svg(this.svg)

    this.renderSvg()
  }

  renderSvg() {
    this.drawCircle()
  }

  drawCircle() {
    const circleNode = this.rc.circle(0, 0, 50, {
      stroke: 'rgba(255, 255, 255, 0)',
      fill: 'rgba(0, 0, 255, 0.5)',
      roughness: 3,
      // strokeWidth: 1,
      fillStyle: 'cross-hatch',
    })

    this.svg.appendChild(circleNode)

    fitViewBox({
      node: circleNode,
      svg: this.svg,
    })

    this.svg.setAttribute('height', '1.5em')
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
