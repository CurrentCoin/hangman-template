const round = inputNumber => Number(inputNumber.toFixed(6))

const scaleSvg = (inputSvg, scaleFactor) =>
  inputSvg.replace(/-?\d*\.?\d+/g, number => round(number * scaleFactor))

const flipXY = inputSvg =>
  inputSvg.replace(
    /-?\d*\.?\d+/g,
    number =>
      number[0] === '-'
        ? number.slice(1)
        : '-' + number
  )

const flipY = inputSvg => {
  console.log('before flipY:', inputSvg)

  return inputSvg
    .replace(
      /(-?\d*\.?\d+) (-?\d*\.?\d+)/g,
      XSpaceY => {
        const [ x, y ] = XSpaceY.split(' ')

        const newY = y[0] === '-'
          ? y.slice(1)
          : y === '0'
            ? y
            : '-' + y

        return `${x} ${newY}`
      }
    )
    .replace(
      /v(-?\d*\.?\d+)/g,
      vY => {
        const y = vY.slice(1)

        const newY = y[0] === '-'
          ? y.slice(1)
          : y === '0'
            ? y
            : '-' + y

        return `v${newY}`
      }
    )
}

const translatePath = ({
  path: inputPath,
  x: xOffset,
  y: yOffset,
}) => {
  if (!inputPath) inputPath = ''

  const outputPath = inputPath.replace(
    /M(-?\d*\.?\d+) (-?\d*\.?\d+)/g,
    mXSpaceY => {
      const [ x, y ] = mXSpaceY.slice(1).split(' ').map(Number)

      const newX = round(x + xOffset)
      const newY = round(y + yOffset)

      return `M${newX} ${newY}`
    }
  )

  return outputPath
}

const processSvgFont = (inputFont, scaleFactor) => {
  const outputFont = {}

  Object.keys(inputFont).forEach(letterName => {
    const letterPath = inputFont[letterName]

    const flippedPath = flipY(letterPath)

    outputFont[letterName] = scaleSvg(flippedPath, scaleFactor)
  })

  return outputFont
}

module.exports = processSvgFont



const fs = require('fs')

const mavenOriginal = require('./MavenProBoldPathsLowerOriginal.json')

fs.writeFile(__dirname + '/MavenProBoldLowerPaths.json', JSON.stringify(
  processSvgFont(mavenOriginal, 0.02), null, 2
), error => {
  if (error) console.log('error:', error)
  else console.log('file written')
})
