const map = require('../src/map');
const assert = require('assert');


describe('map', function() {
  it('receive a matrix and a fn, return a new matrix', function() {
    let a = [[1, 2, 3], [4, 5, 6]];
    assert.deepStrictEqual(map(a, () => 0), [[0, 0, 0], [0, 0, 0]]);
    assert.deepStrictEqual(a, [[1, 2, 3], [4, 5, 6]]);
  });

  it('@param fn(value, r-index, c-index) -> new value', function() {
    let a = [[0, 1, 2], [3, 4, 5]],
        fn = (v, r, c) => (r === c) ? v : 0;
    assert.deepStrictEqual(map(a, fn), [[0, 0, 0], [0, 4, 0]]);
  });
});
