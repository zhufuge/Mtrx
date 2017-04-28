// // like

// // diag
// const b = [1, 2, 3, 4];
// const c = new Mtrx([
//   [1, 0, 0, 0],
//   [0, 2, 0, 0],
//   [0, 0, 3, 0],
//   [0, 0, 0, 4]
// ]);
// assert.deepStrictEqual(new Mtrx(b), c, 'new Mtrx diag is fault');
// assert.deepStrictEqual(Mtrx.diag(b), c, 'Mtrx.diag is fault');

// // eye
// const d = new Mtrx([
//   [1, 0, 0],
//   [0, 1, 0],
//   [0, 0, 1]
// ]);
// assert.deepStrictEqual(Mtrx.eye(3, 3), d, 'Mtrx.eye is fault');

// // by Number, ones, zeros
// const e = new Mtrx([
//   [6, 6, 6],
//   [6, 6, 6]
// ]);
// assert.deepStrictEqual(new Mtrx(2, 3, 6), e, 'new Mtrx by number is fault');
// const ones = new Mtrx([
//   [1, 1, 1],
//   [1, 1, 1],
//   [1, 1, 1]
// ]);
// assert.deepStrictEqual(Mtrx.ones(3, 3), ones, 'Mtrx.ones is fault');
// const zeros = new Mtrx([
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0]
// ]);
// assert.deepStrictEqual(Mtrx.zeros(4, 3), zeros, 'Mtrx.zeros is fault');

// const f = new Mtrx([
//   [0, 1, 1],
//   [1, 0, 1],
//   [1, 1, 0],
//   [1, 1, 1]
// ]);
// assert.deepStrictEqual(new Mtrx(4, 3, (i, j) => (i === j) ? 0 : 1),
//                        f, 'new Mtrx by function is fault');

// const g = new Mtrx([
//   [0, 2, 3],
//   [2, 2, 4],
//   [3, 4, 4],
//   [4, 5, 6]
// ]);
// assert.deepStrictEqual(f.mapMtrx((i, j, a) => a + i + j), g, '.map is fault');

// console.log('create.js NO PROBLEM');
