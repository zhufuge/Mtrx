const Mtrx = require('../index');
const assert = require('assert');
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
} = require('../func');

