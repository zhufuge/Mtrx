function isNumbers (array) {
  const len = array.length;
  if (Array.isArray(array) && len > 0) {
    for (let i = 0; i < len; i++) {
      if (typeof array[i] !== 'number') {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

module.exports = isNumbers;
