const { reduce, every, some, map } = require('../src/collection')
const assert = require('assert')


describe('reduce', function() {
  it('return a reduced number', function() {
    let a = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
    assert.deepEqual(reduce(a, (sum, v) => sum + v), 36)
    assert.deepStrictEqual(a, [[0, 1, 2], [3, 4, 5], [6, 7, 8]])
  })
  it('without init param, start to (0, 0)', function() {
    let a = [[9, 8, 3], [6, 1, 4], [7, 2, 5]]
    assert.deepEqual(reduce(a, (sum, v) => sum + v), 45)
    assert.deepEqual(reduce(a, (min, v) => Math.min(min, v)), 1)
  })
})

describe('every', function() {
  it('receive a matrix and a fn, return a bool', function() {
    let a = [[1, 2, 3], [4, 5, 6]]
    assert.deepStrictEqual(every(a, (v) => v < 4), false)
    assert.deepStrictEqual(a, [[1, 2, 3], [4, 5, 6]])
    assert.deepStrictEqual(every(a, (v) => v > 0), true)
  })

  it('@param fn(value, r-index, c-index) -> bool', function() {
    let a = [[0, 1, 2], [3, 4, 5]],
        fn = (v, r, c) => (r === c) ? true : (v % 2 === 0)
    assert.deepStrictEqual(every(a, fn), false)
  })
})

describe('some', function() {
  it('receive a matrix and a fn, return a bool', function() {
    let a = [[1, 2, 3], [4, 5, 6]]
    assert.deepStrictEqual(some(a, (v) => v < 4), true)
    assert.deepStrictEqual(a, [[1, 2, 3], [4, 5, 6]])
    assert.deepStrictEqual(some(a, (v) => v < 0), false)
  })

  it('@param fn(value, r-index, c-index) -> bool', function() {
    let a = [[0, 1, 2], [3, 4, 5]],
        fn = (v, r, c) => (r === c) ? false : (v % 2 === 0)
    assert.deepStrictEqual(some(a, fn), true)
  })
})

describe('map', function() {
  it('receive a matrix and a fn, return a new matrix', function() {
    let a = [[1, 2, 3], [4, 5, 6]]
    assert.deepStrictEqual(map(a, () => 0), [[0, 0, 0], [0, 0, 0]])
    assert.deepStrictEqual(a, [[1, 2, 3], [4, 5, 6]])
  })

  it('@param fn(value, r-index, c-index) -> new value', function() {
    let a = [[0, 1, 2], [3, 4, 5]],
        fn = (v, r, c) => (r === c) ? v : 0
    assert.deepStrictEqual(map(a, fn), [[0, 0, 0], [0, 4, 0]])
  })
})
