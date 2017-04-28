const isSameShape = require('./isSameShape');

const equalFn = fn => {
  return function(matrix, another) {
    if (!isSameShape(matrix, another)) {
      throw TypeError(matrix + ' \'s shape is no like ' + another);
    }
    return fn(matrix, (n, i, j) => n === another[i][j]);
  };
};

module.exports = equalFn;
