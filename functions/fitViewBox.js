export default ({
  node: inputNode,
  nodes: inputNodes,
  svg,
  height: desiredHeight,
  width: desiredWidth,
}) => {

  let nodes = inputNode || inputNodes

  if (!Array.isArray(nodes)) nodes = [nodes]

  let minLeft = Infinity
  let minTop = Infinity
  let maxRight = -Infinity
  let maxBottom = -Infinity

  nodes.forEach(node => {
    const {
      left,
      right,
      top,
      bottom,
    } = node.getBoundingClientRect()

    if (left < minLeft) minLeft = left
    if (top < minTop) minTop = top
    if (right > maxRight) maxRight = right
    if (bottom > maxBottom) maxBottom = bottom
  })

  const {
    left: svgLeft,
    top: svgTop,
  } = svg.getBoundingClientRect()

  let previousLeft = 0
  let previousTop = 0

  const previousViewBox = svg.getAttribute('viewBox')

  if (previousViewBox) {
    const viewBoxArray = previousViewBox.split(' ')
    previousLeft = Number(viewBoxArray[0])
    previousTop = Number(viewBoxArray[1])
  }

  const padding = 2

  const left = minLeft - svgLeft + previousLeft - padding
  const top = minTop - svgTop + previousTop - padding
  const width = maxRight - minLeft + (2 * padding)
  const height = maxBottom - minTop + (2 * padding)

  svg.setAttribute('viewBox', `${left} ${top} ${width} ${height}`)
  svg.setAttribute('height', height)
  svg.setAttribute('width', width)
}
