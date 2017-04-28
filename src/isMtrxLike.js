const isNumbers = require('./isNumbers');

function isMtrxLike(obj)  {
  return (Array.isArray(obj) &&
          obj.length > 0 &&
          obj[0].length > 0)
    ? obj.every((rows) => isNumbers(rows) && rows.length === obj[0].length)
    : false;
};

module.exports = isMtrxLike;
