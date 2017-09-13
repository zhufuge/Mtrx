function isNumbers (array) {
  const len = array.length
  if (!Array.isArray(array) || len <= 0) return false

  for (let i = 0; i < len; i++) {
    if (typeof array[i] !== 'number') return false
  }
  return true
}

module.exports = isNumbers
