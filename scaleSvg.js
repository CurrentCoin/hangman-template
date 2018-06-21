const round = inputNumber => Number(inputNumber.toFixed(6))

const scaleSvg = (inputSvg, scaleFactor) =>
  inputSvg.replace(/-?\d*\.?\d+/g, number => round(number * scaleFactor))

const flip = (inputSvg) =>
  inputSvg.replace(
    /-?\d*\.?\d+/g,
    number =>
      number[0] === '-'
        ? number.slice(1)
        : '-' + number
  )

// deal with 4 spaces
const flipY = (inputSvg) =>
  inputSvg
    .replace(
      /(-?\d*\.?\d+) (-?\d*\.?\d+) (-?\d*\.?\d+) (-?\d*\.?\d+)/g,
      XSpaceY => {
        const [ x1, y1, x2, y2 ] = XSpaceY.slice(1).split(' ')

        const newY1 = y1[0] === '-'
          ? y1.slice(1)
          : '-' + y1

        const newY2 = y2[0] === '-'
          ? y2.slice(1)
          : '-' + y2

        return `${x1}w${newY1}w${x2}w${newY2}`
      }
    )
    .replace(
      /(-?\d*\.?\d+) (-?\d*\.?\d+)/g,
      XSpaceY => {
        const [ x, y ] = XSpaceY.slice(1).split(' ')

        const newY = y[0] === '-'
          ? y.slice(1)
          : '-' + y

        return `${x}w${newY}`
      }
    )
    .replace(/w/g, ' ')
    .replace(
      /v(-?\d*\.?\d+)/g,
      vNumber => {
        const number = vNumber.slice(1)

        return number[0] === '-'
          ? 'v' + number.slice(1)
          : 'v' + '-' + number
      }
    )

const scaleSvgFont = (inputFont, scaleFactor) => {
  const outputFont = {}

  Object.keys(inputFont).forEach(letterName => {
    const letterPath = inputFont[letterName]

    const flippedPath = flip(letterPath)

    outputFont[letterName] = scaleSvg(flippedPath, scaleFactor)
  })

  return outputFont
}



const fs = require('fs')

const mavenOriginal = require('../assets/MavenProBoldPathsOriginal.json')

fs.writeFile(__dirname + '/../assets/MavenProBoldPaths.json', JSON.stringify(
  scaleSvgFont(mavenOriginal, 0.02), null, 2
), error => {
  if (error) console.log('error:', error)
  else console.log('file written')
})
