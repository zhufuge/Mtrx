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
  reduceMtrx,
  everyMtrx,
  someMtrx,
  multiply,
  rowEchelon,
  LUP,
  inverse,
  det,
  cof,
  compan,
} = require('./func');

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

const toArray = a => [...a];
const equalFn = fn => {
  return function(matrix, another) {
    if (!Mtrx.isSameShape(matrix, another)) {
      throw TypeError(matrix + ' \'s shape is no like ' + another);
    }
    return fn(matrix, (n, i, j) => n === another[i][j]);
  };
};


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
    let fixed = new Mtrx(echelon);
    fixed.changeRows(this.rows - echelon.length);
    return fixed;
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
    if (j === void 0) {
      return this[i];
    }
    return this[i][j];
  }
  get(i, j) {
    if (j === void 0) {
      return this[i];
    }
    return this[i][j];
  }
  set(i, j, n) {
    if (typeof n === 'number') {
      this[i][j] = n;
    }
    return n;
  }
  cof(i, j) {
    return cof(this, i, j);
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
    return mapMtrx(this, fn);
  }

  everyMtrx(fn) {
    return everyMtrx(this, fn);
  }

  someMtrx(fn) {
    return someMtrx(this, fn);
  }

  reduceMtrx(fn, init) {
    return reduceMtrx(this, fn, init);
  }

  sum(type) {
    const _sum = (s, n) => s + n,
          _rows_sum = r => r.reduce(_sum, 0);
    switch(type) {
    case 0:
      return toArray(this.map(_rows_sum));
    case 1:
      return toArray(this.T.map(_rows_sum));
    default:
      return reduceMtrx(this, _sum, 0);
    }
  }
  min(type) {
    const _min = (m, n) => (m > n) ? n : m,
          _rows_min = r => r.reduce(_min);
    switch(type) {
    case 0:
      return toArray(this.map(_rows_min));
    case 1:
      return toArray(this.T.map(_rows_min));
    default:
      return reduceMtrx(this, _min);
    }
  }
  max(type) {
    const _max = (m, n) => (m > n) ? m : n,
          _rows_max = r => r.reduce(_max);
    switch(type) {
    case 0:
      return toArray(this.map(_rows_max));
    case 1:
      return toArray(this.T.map(_rows_max));
    default:
      return reduceMtrx(this, _max);
    }
  }

  static equal(matrix, another) {
    return toArray(equalFn(mapMtrx)(matrix, another));
  }
  static equalAll(matrix, another) {
    return equalFn(everyMtrx)(matrix, another);
  }
  static equalAny(matrix, another) {
    return equalFn(someMtrx)(matrix, another);
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
    const addition = (A, B) => mapMtrx(A, (n, i, j) => n + B[i][j]);
    return new Mtrx(addition(matrix, another));
  }

  static sub(matrix, another) {
    if (!isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.');
    if (!isMtrxLike(another)) throw TypeError(another + ' is not a MtrxLike.');
    if (!this.isSameShape(matrix, another)) {
      throw TypeError(matrix + ' \'s shape is no like ' + another);
    }
    const subtract = (A, B) => mapMtrx(A, (n, i, j) => n - B[i][j]);
    return new Mtrx(subtract(matrix, another));
  }

  static mul(obj, another) {
    let matrix;
    const mulNumber = (A, m) => mapMtrx(A, (n, i, j) => m * n);
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
    let matrix;
    const divNumber = (A, m) => mapMtrx(A, (n, i, j) => m / n);
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
