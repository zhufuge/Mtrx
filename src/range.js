function range(start, stop, step=1) {
  if (stop == null) {
    stop = start || 0
    start = 0
  }
  var length = Math.max(Math.ceil((stop - start) / step), 0)
  var range = Array(length)

  for (let idx = 0; idx < length; idx++, start += step) {
    range[idx] = start
  }

  return range
}

module.exports = range
