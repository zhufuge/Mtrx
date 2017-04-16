const {
  create,
  clone,
  isNumbers,
  isMtrxLike,
  resetMtrx,
  addition,
  mulNumber,
  multiply,
  rowEchelon,
} = require('./func');
const {
  abs,
  floor,
  random,
  max
} = Math;

class Mtrx extends Array{
  constructor(rows=1, cols=rows, nums='R') {
    let matrix;
    if (isMtrxLike(rows)) {
      matrix = clone(rows);
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
  get rank() {
    return rowEchelon(this).length;
  }
  // get LUP() {}
  // get det() {}
  // get inv() {}
  // get compan() {}
  get rowEchelon() {
    const echelon = rowEchelon(this);
    var newMatrix = new Mtrx(echelon);
    newMatrix.changeRows(this.rows - echelon.length);
    return newMatrix;
  }

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
      obj.length === another.length &&
      obj[0].length === another[0].length;
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
      resetMtrx(this, matrix);
    } else if (isNumbers(matrix)){
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
      if (this.cols === obj.length) {
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
      if (this.rows === obj[0].length) {
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
  static mul(obj, another) {
    const isMtrxLike = this.isMtrxLike;
    if (typeof obj === 'number' && isMtrxLike(another)) {
      let matrix = new Mtrx(another);
      mulNumber(true)(matrix, obj);
      return matrix;
    } else if (isMtrxLike(obj) && typeof another === 'number') {
      let matrix = new Mtrx(obj);
      mulNumber(true)(matrix, another);
      return matrix;
    } else if (isMtrxLike(obj) && isMtrxLike(another)) {
      if (obj[0].length === another.length) {
        let matrix = new Mtrx(obj);
        multiply(matrix, another);
        return matrix;
      } else {
        throw TypeError(obj + ' can\'t right multiply ' + another);
      }
    } else {
      throw TypeError(obj + ' is not a Number or a MtrxLike, \n Or ' +
                      another + ' is not a Number or a MtrxLike.');
    }
  }
  // TODO
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
var a = [[1, 7, -1], [4, 2, 3], [2, 0, 1]];
var m = Mtrx.like(a);
console.log(m);
console.log(n);
var r = new Mtrx(3, 3, ()=> floor(random() * 10)/10);
console.log(r.rowEchelon);

module.exports = Mtrx;
