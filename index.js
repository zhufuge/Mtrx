const {
  create,
  clone,
  transpose,
  isNumbers,
  isMtrxLike,
  isSingular,
  isDiag,
  resetMtrx,
  mapMtrx,
  multiply,
  rowEchelon,
  LUP,
  inverse,
  det,
  cof,
  compan,
} = require('./func');

const
addition = (A, B) => mapMtrx((i, j, n) => n + B[i][j], A),
subtract = (A, B) =>  mapMtrx((i, j, n) => n - B[i][j], A),
mulNumber = (A, n) => mapMtrx((i, j, m) => m * n, A),
divNumber = (A, n) => mapMtrx((i, j, m) => m / n, A);

const
createDiag = (a) => create((i, j) => (i === j) ? a[i] : 0)(a.length),
createByNum = (r, c=r, n=0) => create(() => n)(r, c),
createZeros = (r, c=r) => createByNum(r, c, 0),
createByFn = (r, c=r, fn) => create(fn)(r, c),
createRand = create(() => Math.random()),
createEye = create((i, j) => (i === j) ? 1 : 0);

const NumbersError = (...number) => number.forEach((n) => {
  if (typeof n !== 'number') TypeError(n + ' is not a number');
});

class Mtrx extends Array{
  constructor(rows=1, cols=rows, type) {
    let fn;
    if (isMtrxLike(rows)) {
      fn = clone;
    } else if (isNumbers(rows)){
      fn = createDiag;
    } else if (typeof rows === 'number' && typeof cols === 'number') {
      if (type === void 0) {
        fn = createRand;
      } else if (typeof type === 'number') {
        fn = createByNum;
      } else if (typeof type === 'function'){
        fn = createByFn;
      } else {
        fn = createZeros;
      }
    } else {
      throw TypeError(rows + ' is not a Matrix or Number Array or Number.');
    }

    super(...fn(rows, cols, type));
  }

  static zeros(rows=1, cols=rows) {
    NumbersError(rows, cols);
    return new this(rows, cols, 0);
  }
  static ones(rows=1, cols=rows) {
    NumbersError(rows, cols);
    return new this(rows, cols, 1);
  }
  static eye(rows=1, cols=rows) {
    NumbersError(rows, cols);
    return new this(createEye(rows, cols));
  }
  static rand(rows=1, cols=rows) {
    NumbersError(rows, cols);
    return new this(rows, cols);
  }
  static like(matrix) {
    if (!isMtrxLike(matrix)) throw TypeError(`${matrix} isn't a matrix-like`);
    return new this(matrix);
  }
  static diag(array) {
    if (!isNumbers(array)) throw TypeError(`${array} isn't a number array`);
    return new this(array);
  };
  static clone(matrix) {
    if (!this.isMtrx(matrix)) throw TypeError(`${matrix} isn't a Mtrx object`);
    return this.like(matrix);
  }

  get rows() {
    return this.length;
  }
  get cols() {
    return this[0].length;
  }
  get T() {
    return new Mtrx(transpose(this));
  }
  get rank() {
    return rowEchelon(this).length;
  }
  get LUP() {
    let {L, U, P} = LUP(this);
    return {L: new Mtrx(L), U: new Mtrx(U), P: new Mtrx(P)};
  }
  get inv() {
    return new Mtrx(inverse(this));
  }
  get det() {
    return det(this);
  }
  get compan() {
    return new Mtrx(compan(this));
  }
  get rowEchelon() {
    const echelon = rowEchelon(this);
    var newMatrix = new Mtrx(echelon);
    newMatrix.changeRows(this.rows - echelon.length);
    return newMatrix;
  }

  static isMtrx(obj) {
    return obj instanceof Mtrx;
  }
  static isMtrxLike(obj) {
    return isMtrxLike(obj);
  }
  static isDiag(obj) {
    return isDiag(obj);
  }
  static isSameShape(obj, another) {
    return isMtrxLike(obj) &&
      isMtrxLike(another) &&
      obj.length === another.length &&
      obj[0].length === another[0].length;
  }

  of(i, j) {
    return this[i][j];
  }
  cof(i, j) {
    return new Mtrx(cof(this, i, j));
  }
  changeRows(rows=0, nums=0) {
    const cols = this.cols;
    if (rows > 0) {
      let r;
      for (let i = 0; i < rows; i++) {
        r = Array(cols).fill(nums);
        this.push(r);
      }
    } else {
      for (let i = rows; i < 0; i++) {
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
      for (let i = cols; i < 0; i++) {
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

  mapMtrx(fn) {
    return new Mtrx(mapMtrx(fn, this));
  }

  add(matrix) {
    return Mtrx.add(this, matrix);
  }
  sub(matrix) {
    return Mtrx.sub(this, matrix);
  }
  mul(obj) {
    return Mtrx.mul(this, obj);
  }
  rightMul(obj) {
    return Mtrx.mul(this, obj);
  }
  leftMul(obj) {
    return Mtrx.mul(obj, this);
  }
  div(obj) {
    return Mtrx.div(this, obj);
  }
  rightDiv(obj) {
    return Mtrx.div(this, obj);
  }
  leftDiv(obj) {
    return Mtrx.div(obj, this);
  }

  static add(matrix, another) {
    if (!isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    if (!isMtrxLike(another)) throw TypeError(another + ' is not a MtrxLike.');
    if (!this.isSameShape(matrix, another)) {
      throw TypeError(matrix + ' \'s shape is no like ' + another);
    }
    return new Mtrx(addition(matrix, another));
  }

  static sub(matrix, another) {
    if (!isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    if (!isMtrxLike(another)) throw TypeError(another + ' is not a MtrxLike.');
    if (!this.isSameShape(matrix, another)) {
      throw TypeError(matrix + ' \'s shape is no like ' + another);
    }
    return new Mtrx(subtract(matrix, another));
  }

  static mul(obj, another) {
    let matrix;
    if (typeof obj === 'number' && isMtrxLike(another)) {
      matrix =  mulNumber(another, obj);
    } else if (isMtrxLike(obj) && typeof another === 'number') {
      matrix = mulNumber(obj, another);
    } else if (isMtrxLike(obj) && isMtrxLike(another)) {
      if (obj[0].length !== another.length) {
        throw TypeError(obj + ' can\'t right multiply ' + another);
      }
      matrix =  multiply(obj, another);
    } else {
      throw TypeError(obj + ' is not a Number or a MtrxLike, \n Or ' +
                      another + ' is not a Number or a MtrxLike.');
    }
    return new Mtrx(matrix);
  }

  static div(obj, another) {
    var matrix;
    if (typeof obj === 'number' && isMtrxLike(another)) {
      matrix = divNumber(another, obj);
    } else if (isMtrxLike(obj) && typeof another === 'number') {
      matrix = divNumber(obj, another);
    } else if (isMtrxLike(obj) && isMtrxLike(another)) {
      if (obj[0].length !== another.length || isSingular(another)) {
        throw TypeError(obj + ' can\'t right divide ' + another);
      }
      matrix = multiply(matrix, inverse(another));
    } else {
      throw TypeError(obj + ' is not a Number or a MtrxLike, \n Or ' +
                      another + ' is not a Number or a MtrxLike.');
    }
    return new Mtrx(matrix);
  }

  static cof(matrix, i, j) {
    if (!isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    return new Mtrx(cof(matrix, i, j));
  };

  toString() {
    let matrix = [...this];
    const rows = this.rows;
    for (let i = 0; i < rows; i++) {
      matrix[i] = '  [ ' + matrix[i].join(' ') +' ],\n';
    }
    return '[\n' + matrix.join('') + ']';
  }
}

module.exports = Mtrx;
