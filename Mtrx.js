const ArrayProto = Array.prototype;
const NativeIsArray = Array.isArray;
const {abs, floor, random, max} = Math;


function create(fn) {
  return function(rows=1, cols=rows) {
    var matrix = Array(rows);
    for (let i = 0; i < rows; i++) {
      matrix[i] = new Float64Array(cols);
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = fn(i, j);
      }
    }
    return matrix;
  };
}

class Mtrx extends Array{
  constructor(rows=1, cols=rows, nums='R') {
    let matrix;
    if (nums === 'R') {
      matrix = create(() => random())(rows, cols);
    } else if (nums === 'E') {
      matrix = create((i, j) => (i === j) ? 1 : 0)(rows, cols);
    } else if (typeof nums === 'number') {
      matrix = create(() => nums)(rows, cols);
    } else if (typeof nums === 'function'){
      matrix = create(nums)(rows, cols);
    } else {
      matrix = create(() => 0)(rows, cols);
    }
    super(...matrix);
  }

  static zeros(rows=1, cols=rows) {
    return new this(rows, cols, 0);
  }
  static ones(rows=1, cols=rows) {
    return new this(rows, cols, 1);
  }
  static eye(rows=1, cols=rows) {
    return new this(rows, cols, 'E');
  }
  static rand(rows=1, cols=rows) {
    return new this(rows, cols);
  }
  static diag(array) {
    if (array === undefined || array === null) {
      throw TypeError('Function Mtrx.diag arguments is undefined');
    }
    return create((i, j) => (i === j) ? array[i] : 0)(array.length);
  };

  get rows() {
    return this.length;
  }
  get cols() {
    return this[0].length;
  }

  static clone(matrix) {
    if (!this.isMtrx(matrix)) throw TypeError(obj + ' is not a Mtrx.');
    return new this(matrix.rows, matrix.cols, (i, j) => matrix[i][j]);
  }

  static isMtrx(obj) {
    return obj instanceof Mtrx;
  }

  static isSquare(matrix) {
    if (this.isMtrx(obj)) {
      return this.rows === this.cols;
    } else {
      throw TypeError(obj + ' is not a Mtrx.');
    }
  }
}

var m = Mtrx.eye(3, 4);
var c = Mtrx.clone(m);
console.log(m);
console.log(c);
c[0][0] = 6;
console.log(m);
console.log(c);
console.log();
