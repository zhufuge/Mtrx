const { reduce, every, some, map } = require('./collection')

const isDiag = require('./isDiag')
const isNumberArray = require('./isNumberArray')
const isMtrxLike = require('./isMtrxLike')
const isSingular = require('./isSingular')
const isSameShape = require('./isSameShape')

const transpose = require('./transpose')
const multiply = require('./multiply')
const inverse = require('./inverse')
const compan = require('./compan')
const clone = require('./clone')
const rank = require('./rank')
const det = require('./det')
const lup = require('./lup')
const cof = require('./cof')

const reset = require('./reset')

const create = require('./create')
const createByNum = (r, c=r, n=0) => create(() => n)(r, c)
const createZeros = (r, c=r) => createByNum(r, c, 0)
const createDiag = (a) => create((i, j) => (i === j) ? a[i] : 0)(a.length)
const createByFn = (r, c=r, fn) => create(fn)(r, c)
const createRand = create(() => Math.random())
const createEye = create((i, j) => (i === j) ? 1 : 0)
const toArray = a => [...a]

const NumbersError = (...number) => number.forEach((n) => {
  if (typeof n !== 'number') TypeError(n + ' is not a number')
})

const equalFn = fn => {
  return function(matrix, another) {
    if (!isSameShape(matrix, another)) {
      throw TypeError(matrix + ' \'s shape is no like ' + another)
    }
    return fn(matrix, (n, i, j) => n === another[i][j])
  }
}

class Mtrx extends Array{
  constructor(rows=1, cols=rows, type) {
    let fn
    if (isMtrxLike(rows)) {
      fn = clone
    } else if (isNumberArray(rows)){
      fn = createDiag
    } else if (typeof rows === 'number' && typeof cols === 'number') {
      if (type === void 0) {
        fn = createRand
      } else if (typeof type === 'number') {
        fn = createByNum
      } else if (typeof type === 'function'){
        fn = createByFn
      } else {
        fn = createZeros
      }
    } else {
      throw TypeError(rows + ' is not a Matrix or Number Array or Number.')
    }

    super(...fn(rows, cols, type))
  }

  get rows() { return this.length }
  get cols() { return this[0].length }
  get rank() { return rank(this) }
  get det() { return det(this) }

  get(i, j) { return this[i][j] }
  set(i, j, n) {
    if (typeof n === 'number') {
      this[i][j] = n
    }
  }

  changeRows(rows=0, nums=0) {
    const cols = this.cols
    if (rows > 0) {
      let r
      for (let i = 0; i < rows; i++) {
        r = Array(cols).fill(nums)
        this.push(r)
      }
    } else {
      for (let i = rows; i < 0; i++) {
        this.pop()
      }
    }
  }
  changeCols(cols=0, nums=0) {
    if (cols > 0) {
      for (let i = 0; i < cols; i++) {
        for (let row of this) {
          row.push(nums)
        }
      }
    } else {
      for (let i = cols; i < 0; i++) {
        for (let row of this) {
          row.pop()
        }
      }
    }
  }

  resetLike(matrix) {
    if (isMtrxLike(matrix)) {
      reset(this, matrix)
    } else if (isNumberArray(matrix)){
      reset(this, create((i, j) => (i === j) ? matrix[i] : 0)(matrix.length))
    }  else {
      throw TypeError(matrix + ' is not a Matrix or Number-Arrays-Array.')
    }
  }

  cof(i, j) { return cof(this, i, j) }
  T() { return new Mtrx(transpose(this)) }
  compan() { return new Mtrx(compan(this)) }
  inv() { return new Mtrx(inverse(this)) }
  LUP() {
    let { L, U, P } = lup(this)
    return { L: new Mtrx(L), U: new Mtrx(U), P: new Mtrx(P) }
  }

  mapMtrx(fn) { return map(this, fn) }
  everyMtrx(fn) { return every(this, fn) }
  someMtrx(fn) { return some(this, fn) }
  reduceMtrx(fn, init) { return reduce(this, fn, init) }

  sum(type) {
    const _sum = (s, n) => s + n,
          _rows_sum = r => r.reduce(_sum, 0)
    switch(type) {
    case 0:
      return toArray(this.map(_rows_sum))
    case 1:
      return toArray(this.T().map(_rows_sum))
    default:
      return reduce(this, _sum, 0)
    }
  }
  min(type) {
    const _min = (m, n) => (m > n) ? n : m,
          _rows_min = r => r.reduce(_min)
    switch(type) {
    case 0:
      return toArray(this.map(_rows_min))
    case 1:
      return toArray(this.T().map(_rows_min))
    default:
      return reduce(this, _min)
    }
  }
  max(type) {
    const _max = (m, n) => (m > n) ? m : n,
          _rows_max = r => r.reduce(_max)
    switch(type) {
    case 0:
      return toArray(this.map(_rows_max))
    case 1:
      return toArray(this.T().map(_rows_max))
    default:
      return reduce(this, _max)
    }
  }

  add(matrix) { return Mtrx.add(this, matrix) }
  sub(matrix) { return Mtrx.sub(this, matrix) }
  mul(obj) { return Mtrx.mul(this, obj) }
  rightMul(obj) { return Mtrx.mul(this, obj) }
  leftMul(obj) { return Mtrx.mul(obj, this) }
  div(obj) { return Mtrx.div(this, obj) }
  rightDiv(obj) { return Mtrx.div(this, obj) }
  leftDiv(obj) { return Mtrx.div(obj, this) }

  static zeros(rows=1, cols=rows) {
    NumbersError(rows, cols)
    return new this(rows, cols, 0)
  }
  static ones(rows=1, cols=rows) {
    NumbersError(rows, cols)
    return new this(rows, cols, 1)
  }
  static eye(rows=1, cols=rows) {
    NumbersError(rows, cols)
    return new this(createEye(rows, cols))
  }
  static rand(rows=1, cols=rows) {
    NumbersError(rows, cols)
    return new this(rows, cols)
  }
  static like(matrix) {
    if (!isMtrxLike(matrix)) throw TypeError(`${matrix} isn't a matrix-like`)
    return new this(matrix)
  }
  static diag(array) {
    if (!isNumberArray(array)) throw TypeError(`${array} isn't a number array`)
    return new this(array)
  }
  static clone(matrix) {
    if (!this.isMtrx(matrix)) throw TypeError(`${matrix} isn't a Mtrx object`)
    return new this(matrix)
  }

  static isMtrx(obj) { return obj instanceof Mtrx }
  static isMtrxLike(obj) { return isMtrxLike(obj) }
  static isDiag(obj) { return isDiag(obj) }
  static isSingular(matrix) { return isSingular(matrix) }
  static isSameShape(obj, another) { return isSameShape(obj, another) }

  static equal(matrix, another) { return toArray(equalFn(map)(matrix, another))}
  static equalAll(matrix, another) { return equalFn(every)(matrix, another) }
  static equalAny(matrix, another) { return equalFn(some)(matrix, another) }

  static add(matrix, another) {
    if (!isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.')
    if (!isMtrxLike(another)) throw TypeError(another + ' is not a MtrxLike.')
    if (!this.isSameShape(matrix, another)) {
      throw TypeError(matrix + ' \'s shape is no like ' + another)
    }
    const addition = (A, B) => map(A, (n, i, j) => n + B[i][j])
    return new Mtrx(addition(matrix, another))
  }
  static sub(matrix, another) {
    if (!isMtrxLike(matrix)) throw TypeError(matrix + ' is not a MtrxLike.')
    if (!isMtrxLike(another)) throw TypeError(another + ' is not a MtrxLike.')
    if (!this.isSameShape(matrix, another)) {
      throw TypeError(matrix + ' \'s shape is no like ' + another)
    }
    const subtract = (A, B) => map(A, (n, i, j) => n - B[i][j])
    return new Mtrx(subtract(matrix, another))
  }
  static mul(obj, another) {
    let matrix
    const mulNumber = (A, m) => map(A, (n) => m * n)
    if (typeof obj === 'number' && isMtrxLike(another)) {
      matrix =  mulNumber(another, obj)
    } else if (isMtrxLike(obj) && typeof another === 'number') {
      matrix = mulNumber(obj, another)
    } else if (isMtrxLike(obj) && isMtrxLike(another)) {
      matrix =  multiply(obj, another)
    } else {
      throw TypeError(obj + ' is not a Number or a MtrxLike, \n Or ' +
                      another + ' is not a Number or a MtrxLike.')
    }
    return new Mtrx(matrix)
  }
  static div(obj, another) {
    let matrix
    if (typeof obj === 'number' && isMtrxLike(another)) {
      const leftDivNumber = (m, A) => map(A, (n) => m / n)
      matrix = leftDivNumber(obj, another)
    } else if (isMtrxLike(obj) && typeof another === 'number') {
      const rightDivNumber = (A, m) => map(A, (n) => n / m)
      matrix = rightDivNumber(obj, another)
    } else if (isMtrxLike(obj) && isMtrxLike(another)) {
      if (obj[0].length !== another.length || this.isSingular(another)) {
        throw TypeError(obj + ' can\'t right divide ' + another)
      }
      matrix = multiply(obj, inverse(another))
    } else {
      throw TypeError(obj + ' is not a Number or a MtrxLike, \n Or ' +
                      another + ' is not a Number or a MtrxLike.')
    }
    return new Mtrx(matrix)
  }
}

module.exports = Mtrx
