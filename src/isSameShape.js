const isMtrxLike = require('./isMtrxLike')

function isSameShape(obj, another) {
  return isMtrxLike(obj) &&
    isMtrxLike(another) &&
    obj.length === another.length &&
    obj[0].length === another[0].length
}

module.exports = isSameShape
