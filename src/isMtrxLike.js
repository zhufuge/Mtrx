const { isNumberArray } = require('./lang')

function isMtrxLike(obj)  {
  return Array.isArray(obj) &&
    obj.length > 0 &&
    obj[0].length > 0 &&
    obj.every(rows => isNumberArray(rows) && rows.length === obj[0].length)
}

module.exports = isMtrxLike
