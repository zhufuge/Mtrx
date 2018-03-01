function isNumber(obj) {
  return typeof obj === 'number'
}

function toArray(value) {
  return [...value]
}

module.exports = {
  isNumber,
  toArray,
}
