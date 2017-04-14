const ArrayProto = Array.prototype;
const NativeIsArray = Array.isArray;
const {abs, floor, random, max} = Math;


function create(fn) {
  return function(rows=1, cols=rows) {
    var matrix = Array(rows);
    for (let i = 0; i < rows; i++) {
      matrix[i] = Array(cols);
      for (let j = 0; j < cols; j++) {
        matrix[i][j] = fn(i, j);
      }
    }
    return matrix;
  };
}

function isNumbers(array) {
  if (!NativeIsArray(array) || array.length <= 0) return false;
  for (let i of array) {
    if (typeof i !== 'number') return false;
  }
  return true;
}
function isMtrxLike(obj) {
  if (!NativeIsArray(obj) || obj.length <= 0) return false;

  const length = obj[0].length;
  if (length <= 0) return false;

  for (let rows of obj) {
    if (!isNumbers(rows) ||
        rows.length !== length) {
      return false;
    }
  }

  return true;
}
function clean(matrix) {
  const rows = matrix.rows;
  for (let i = rows; i > 0; i--) {
    matrix.pop();
  }
}
function resetMtrx(matrix, matrixLike) {
  const length = matrixLike.length;
  for (let i = 0; i < length; i++) {
    matrix.push(matrixLike[i]);
  }
}


function addition(add=true) {
  const operator = (a, b) => (add) ? (a + b) : (a - b);
  return function(A, B) {
    const rows = A.rows,
          cols = A.cols;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        A[i][j] = operator(A[i][j], B[i][j]);
      }
    }
  };
}
function mulNumber(mul=true) {
  const operator = (a, b) => (mul) ? (a * b) : (a / b);
  return function(A, n) {
    const rows = A.rows,
          cols = A.cols;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        A[i][j] = operator(A[i][j], n);
      }
    }
  };
}
function multiply(matrix, another) {
  const rows = matrix.rows,
        cols = another.cols,
        n = matrix.cols;

  let newMatrix = create((i, j) => {
    let sum = 0;
    for (let k = 0; k < n; k++) {
      sum += matrix[i][k] * another[k][j];
    }
    return sum;
  })(rows, cols);

  for (let i = 0; i < rows; i++) {
    matrix[i] = newMatrix[i];
  }
}

class Mtrx extends Array{
  constructor(rows=1, cols=rows, nums='R') {
    let matrix;
    if (isMtrxLike(rows)) {
      matrix = rows;
    } else if (isNumbers(rows)){
      matrix = create((i, j) => (i === j) ? rows[i] : 0)(rows.length);
    } else if (typeof rows === 'number' && typeof cols === 'number') {
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
    } else {
      throw TypeError(rows + ' is not a Matrix or Number Array or Number.');
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
  static like(secondOrder) {
    return new this(secondOrder);
  }
  static diag(array) {
    return new this(array);
  };

  get rows() {
    return this.length;
  }
  get cols() {
    return this[0].length;
  }
  get T() {
    return new Mtrx(this.cols, this.rows, (i, j) => this[j][i]);
  }
  // TODO
  // get rank() {}
  // get LUP() {}
  // get det() {}
  // get inv() {}
  // get compan() {}
  // get rowEchelon() {}

  static clone(matrix) {
    if (!this.isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    return new this(matrix);
  }

  static isMtrx(obj) {
    return obj instanceof Mtrx;
  }
  static isMtrxLike(obj) {
    return isMtrxLike(obj);
  }
  static isSameShape(obj, another) {
    return this.isMtrxLike(obj) &&
      this.isMtrxLike(another) &&
      obj.rows === another.rows &&
      obj.cols === another.cols;
  }

  changeRows(rows=0, nums=0) {
    const cols = this.cols;
    if (rows > 0) {
      let r;
      for (let i = 0; i < rows; i++) {
        r = Array(cols);
        for (let j = 0; j < cols; j++) {
          r[j] = nums;
        }
        this.push(r);
      }
    } else {
      for (let i = 0; i < abs(rows); i++) {
        this.pop();
      }
    }
  }
  changeCols(cols=0, nums=0) {
    if (cols > 0) {
      for (let i = 0; i < cols; i++) {
        for (let row of this) {
          row.push(nums);
        }
      }
    } else {
      for (let i = 0; i < abs(cols); i++) {
        for (let row of this) {
          row.pop();
        }
      }
    }
  }
  resetLike(matrix) {
    if (isMtrxLike(matrix)) {
      clean(this);
      resetMtrx(this, matrix);
    } else if (isNumbers(matrix)){
      clean(this);
      resetMtrx(this, create((i, j) => (i === j) ? matrix[i] : 0)(matrix.length));
    }  else {
      throw TypeError(rows + ' is not a Matrix or Number Array.');
    }
  }

  add(matrix) {
    if (!Mtrx.isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    if (Mtrx.isSameShape(this, matrix)) {
      addition(true)(this, matrix);
    } else {
      throw TypeError(matrix + ' \'s shape is no like ' + this);
    }
  }
  sub(matrix) {
    if (!Mtrx.isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    if (Mtrx.isSameShape(this, matrix)) {
      addition(false)(this, matrix);
    } else {
      throw TypeError(matrix + ' \'s shape is no like ' + this);
    }
  }
  mul(obj) {
    if (typeof obj === 'number') {
      mulNumber(true)(this, obj);
    } else if (Mtrx.isMtrxLike(obj)) {
      if (this.cols === obj.rows) {
        multiply(this, obj);
      } else {
        throw TypeError(this + ' can\'t right multiply ' + obj);
      }
    } else {
      throw TypeError(obj + ' is not a Number or a MtrxLike');
    }
  }
  rightMul(obj) {
    this.mul(obj);
  }
  leftMul(obj) {
    if (typeof obj === 'number') {
      mulNumber(true)(this, obj);
    } else if (Mtrx.isMtrxLike(obj)) {
      if (this.rows === obj.cols) {
        let newMatrix = Mtrx.clone(obj);
        multiply(obj, this);
        this.resetLike(newMatrix);
      } else {
        throw TypeError(this + ' can\'t multiply ' + obj);
      }
    } else {
      throw TypeError(obj + ' is not a Number or a MtrxLike');
    }
  }
  // TODO: div a matrix
  div(obj) {
    if (typeof obj === 'number') {
      mulNumber(false)(this, obj);
    } else if (Mtrx.isMtrxLike(obj)) {
    } else {
      throw TypeError(obj + ' is not a Number or a MtrxLike');
    }
  }
  // TODO
  // rightDiv(obj) {}
  // leftDiv(obj) {}

  static add(matrix, another) {
    if (!this.isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    if (!this.isMtrxLike(another)) throw TypeError(another + ' is not a MtrxLike.');
    if (this.isSameShape(matrix, another)) {
      let newMatrix = this.clone(matrix);
      addition(true)(matrix, another);
      return matrix;
    } else {
      throw TypeError(matrix + ' \'s shape is no like ' + another);
    }
  }
  static sub(matrix, another) {
    if (!this.isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    if (!this.isMtrxLike(another)) throw TypeError(another + ' is not a MtrxLike.');
    if (this.isSameShape(matrix, another)) {
      let newMatrix = this.clone(matrix);
      addition(false)(matrix, another);
      return matrix;
    } else {
      throw TypeError(matrix + ' \'s shape is no like ' + another);
    }
  }
  // TODO
  // static mul(matrix, obj) {}
  // static div(matrix, obj) {}

  toString() {
    let matrix = [...this];
    const rows = this.rows;
    for (let i = 0; i < rows; i++) {
      matrix[i] = '  [ ' + matrix[i].join(' ') +' ],\n';
    }
    return '[\n' + matrix.join('') + ']';
  }
}

var n = new Mtrx([[2, 0, -1], [1, 3, 2]]);
var m = Mtrx.like([[1, 7, -1], [4, 2, 3], [2, 0, 1]]);
console.log(m);
console.log(n);
//n.rightMul(m);
//m.leftMul(n);
//m.resetLike(n);
console.log(m);
console.log(n);

