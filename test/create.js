const create = require('../src/create')
const assert = require('assert')
const se = assert.strictEqual,
      dse = assert.deepStrictEqual

describe('create', function() {
  it('always return a function', function() {
    se(typeof create(() => 0), 'function')
  })

  it('receive a func that describe the number of position(i, j)', function() {
    dse(create((i, j) => i * j + j)(2, 3), [[0, 1, 2], [0, 2, 4]])
  })

  it('return a func that receive a number and return a n*n matrix', function() {
    dse(create(() => 0)(3), [[0, 0, 0], [0, 0, 0], [0, 0, 0]])
  })

  it('return a func that receive two numbers and return a n*m matrix', function() {
    dse(create(() => 1)(2, 3), [[1, 1, 1], [1, 1, 1]])
  })
})
