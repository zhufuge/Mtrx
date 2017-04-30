const every = require('../src/every');
const assert = require('assert');


describe('every', function() {
  it('receive a matrix and a fn, return a bool', function() {
    let a = [[1, 2, 3], [4, 5, 6]];
    assert.deepStrictEqual(every(a, (v) => v < 4), false);
    assert.deepStrictEqual(a, [[1, 2, 3], [4, 5, 6]]);
    assert.deepStrictEqual(every(a, (v) => v > 0), true);
  });

  it('@param fn(value, r-index, c-index) -> bool', function() {
    let a = [[0, 1, 2], [3, 4, 5]],
        fn = (v, r, c) => (r === c) ? true : (v % 2 === 0);
    assert.deepStrictEqual(every(a, fn), false);
  });
});
