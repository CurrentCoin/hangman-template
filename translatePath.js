const round = inputNumber => Number(inputNumber.toFixed(6))

export default ({
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
