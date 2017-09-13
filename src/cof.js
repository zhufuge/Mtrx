function cof(matrix, i, j) {
  const RCfilter = (pass) => (val, index) => (index === pass) ? false : true
  return matrix.filter(RCfilter(i)).map(r => r.filter(RCfilter(j)))
}

module.exports = cof;
