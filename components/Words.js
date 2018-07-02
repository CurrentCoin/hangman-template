import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Word from './Word'

export default class Words extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: '',
  }

  render() {
    const {
      text,
    } = this.props

    const words = text.split(' ').map(word => word.concat(' '))

    const lastWord = words[words.length - 1]

    words[words.length - 1] = lastWord.slice(0, -1)

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          padding: '0.5em',
        }}
        ref={ref => this.wrapper = ref}
      >
        {
          words.map((word, index) => {
            return <Word text={word} key={index} />
          })
        }
      </div>
    )
  }
}
