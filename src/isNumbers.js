function isNumbers (array) {
  return (Array.isArray(array) && array.length > 0)
    ? array.every((i) => typeof i === 'number')
    : false;
}

module.exports = isNumbers;
