export default node => {
  while(node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
