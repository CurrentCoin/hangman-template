import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs-es5'

import letterPaths from '../fonts/MavenProBoldUpperPaths'
import clearNode from '../functions/clearNode'
import fitViewBox from '../functions/fitViewBox'

import themes from '../themes'

export default class Letter extends PureComponent {
  static propTypes = {
    letter: PropTypes.string.isRequired,
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
    this.drawLetter()
  }

  drawLetter() {
    const {
      letter,
      theme,
    } = this.props

    const { fontColor } = themes[theme]

    if (letter === ' ') {
      this.svg.setAttribute('height', '1em')
      this.svg.setAttribute('width', '1em')
      return
    }

    const path = letterPaths[letter.toUpperCase()]

    const letterNode = this.rc.path(path, {
      simplification: 3,
      fillStyle: 'solid',
      fill: fontColor,
      stroke: fontColor,
    })

    this.svg.appendChild(letterNode)

    fitViewBox({
      node: letterNode,
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
