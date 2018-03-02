function isNumber(obj) {
  return typeof obj === 'number'
}

function isNumberArray (obj) {
  const len = obj.length
  if (!Array.isArray(obj) || len <= 0) return false

  for (let i = 0; i < len; i++) {
    if (typeof obj[i] !== 'number') return false
  }
  return true
}

function toArray(value) {
  return [...value]
}

module.exports = {
  isNumber,
  isNumberArray,
  toArray,
}
