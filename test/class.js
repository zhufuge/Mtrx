const Mtrx = require('..')
const assert = require('assert')
const dse = assert.deepStrictEqual
const se = assert.strictEqual
const eq = assert.equal

describe('constructor ', function() {
  it('accept a matrix', function() {
    const a = [
      [7, 8, 2],
      [9, 2, 4]
    ]
    assert.deepEqual(new Mtrx(a), a)
  })
  it('accept a number array', function() {
    const a = [1, 2, 3, 6]
    const m = new Mtrx([
      [1, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 3, 0],
      [0, 0, 0, 6]
    ])
    dse(new Mtrx(a), m)
  })
  it('accept 3 numbers', function() {
    const m = new Mtrx(2, 3, 6)
    const n = new Mtrx([
      [6, 6, 6],
      [6, 6, 6],
    ])
    dse(m, n)
  })
  it('accept 2 numbers and a function', function() {
    const m = new Mtrx(3, 3, (i, j) => i + j)
    const n = new Mtrx([
      [0, 1, 2],
      [1, 2, 3],
      [2, 3, 4]
    ])
    dse(m, n)
  })
  it('accept error argument, it will throw', function() {
    assert.throws(() => {
      const a = new Mtrx('123')
    })
  })
})
describe('property ', function() {
  const m = new Mtrx([
    [1, 2, 0, 0],
    [3, 4, 4, 0],
    [5, 6, 3, 0]
  ])
  const n = new Mtrx([
    [1, 2, 0, 0, 1],
    [3, 4, 4, 0, 1],
    [5, 6, 3, 0, 1],
    [5, 6, 3, 0, 1]
  ])
  const diag = new Mtrx([
    [6,   0, 0, 0],
    [0, 0.6, 0, 0],
    [0,   0, 2, 0],
    [0,   0, 0, 1]
  ])
  it('get rows', function() {
    eq(m.rows, 3)
    eq(n.rows, 4)
  })
  it('get cols', function() {
    eq(m.cols, 4)
    eq(n.cols, 5)
  })
  it('get rank', function() {
    eq(m.rank, 3)
    eq(n.rank, 3)
    eq(diag.rank, 4)
  })
  it('get det', function() {
    const d = new Mtrx([
      [1, 2, 0],
      [3, 4, 4],
      [5, 6, 3]
    ])
    assert.ok(Number.isNaN(m.det))
    eq(d.det, 10)
    eq(diag.det, 7.199999999999999)
  })
})
describe('method ', function() {
  describe('Matrix item operation', function() {
    const m = new Mtrx([
      [0, 1, 0],
      [1, 3, 4],
      [8, 0 ,2]
    ])
    it('get (i, j) item', function() {
      eq(m[1][2], 4)
      eq(m.get(2, 2), 2)
      eq(m[1][1], m.get(1, 1))
    })
    it('set (i, j) item', function() {
      m[1][1] = 6
      m.set(2, 1, 7)
      const n = new Mtrx([
        [0, 1, 0],
        [1, 6, 4],
        [8, 7, 2]
      ])
      dse(m, n)
    })
  })
  describe('Change ', function() {
    describe('ChangeRows', function() {
      it('add rows', function() {
        const m = new Mtrx([
          [0, 1, 0],
          [1, 6, 4],
          [8, 0, 2],
        ])
        m.changeRows(2, 4)
        const r1 = new Mtrx([
          [0, 1, 0],
          [1, 6, 4],
          [8, 0, 2],
          [4, 4, 4],
          [4, 4, 4]
        ])
        dse(m, r1)

        m.changeRows(3)
        const r2 = new Mtrx([
          [0, 1, 0],
          [1, 6, 4],
          [8, 0, 2],
          [4, 4, 4],
          [4, 4, 4],
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ])
        dse(m, r2)
      })
      it('remove rows', function() {
        const m = new Mtrx([
          [0, 1, 0],
          [1, 6, 4],
          [8, 0, 2],
          [4, 4, 4],
          [3, 4, 5]
        ])
        m.changeRows(-2)
        const r = new Mtrx([
          [0, 1, 0],
          [1, 6, 4],
          [8, 0, 2]
        ])
        dse(m, r)
      })
    })
    describe('ChangeCols', function() {
      it('add cols', function() {
        const m = new Mtrx([
          [0, 1],
          [1, 6],
          [8, 0],
          [4, 4]
        ])
        m.changeCols(2)
        const r1 = new Mtrx([
          [0, 1, 0, 0],
          [1, 6, 0, 0],
          [8, 0, 0, 0],
          [4, 4, 0, 0],
        ])
        dse(m, r1)

        m.changeCols(3, 9)
        const r2 = new Mtrx([
          [0, 1, 0, 0, 9, 9, 9],
          [1, 6, 0, 0, 9, 9, 9],
          [8, 0, 0, 0, 9, 9, 9],
          [4, 4, 0, 0, 9, 9, 9],
        ])
        dse(m, r2)
      })
      it('remove cols', function() {
        const m = new Mtrx([
          [0, 1, 0, 0],
          [1, 6, 0, 0],
          [8, 0, 0, 0],
          [4, 4, 0, 0],
        ])

        m.changeCols(-1)
        const r = new Mtrx([
          [0, 1, 0],
          [1, 6, 0],
          [8, 0, 0],
          [4, 4, 0],
        ])
        dse(m, r)
      })
    })
    describe('resetLike', function() {
      it('change all item', function() {
        const m = new Mtrx([
          [1, 2],
          [3, 4]
        ])
        const p = [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ]
        m.resetLike(p)
        const r = new Mtrx(p)

        dse(m, r)
      })
    })
  })
  describe('corresponding matrix', function() {
    const m = new Mtrx([
      [1, 2, 0],
      [3, 4, 4],
      [5, 6, 3]
    ])
    const diag = new Mtrx([
      [6,   0, 0, 0],
      [0, 0.6, 0, 0],
      [0,   0, 2, 0],
      [0,   0, 0, 1]
    ])
    it('cof', function() {
      const n = new Mtrx([
        [1, 0],
        [5, 3]
      ])
      dse(m.cof(1, 1), n)
    })
    it('transpose', function() {
      const t = new Mtrx([
        [1, 3, 5],
        [2, 4, 6],
        [0, 4, 3]
      ])
      dse(m.T(), t)
      dse(diag.T(), diag)
    })
    it('compan', function() {
      const compan = new Mtrx([
        [-12, -6, 8],
        [11, 3.0000000000000004, -4],
        [-2.0000000000000018, 3.999999999999999, -1.9999999999999993]
      ])
      dse(m.compan(), compan)
    })
    it('inverse', function() {
      const inv = new Mtrx([
        [-1.2, -0.6,  0.8 ],
        [1.1, 0.30000000000000004, -0.4 ],
        [-0.20000000000000018, 0.3999999999999999, -0.19999999999999993 ]
      ])
      dse(m.inv(), inv)
    })
    it('LUP', function() {
      const mlup = m.LUP(),
            dlup = diag.LUP()

      const l = new Mtrx([
        [  1, 0, 0],
        [0.2, 1, 0],
        [0.6, 0.5000000000000006, 1]
      ])
      dse(mlup.L, l)
      dse(dlup.L, Mtrx.eye(4))

      const u = new Mtrx([
        [5, 6, 3],
        [0, 0.7999999999999998, -0.6000000000000001],
        [0, 0, 2.5000000000000004]
      ])
      dse(mlup.U, u)
      dse(dlup.U, diag)

      const p = new Mtrx([
        [ 0, 0, 1 ],
        [ 1, 0, 0 ],
        [ 0, 1, 0 ]
      ])
      dse(mlup.P, p)
      dse(dlup.P, Mtrx.eye(4))
    })
  })
  describe('traverse matrix', function() {
    const m = new Mtrx([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])
    it('map', function() {
      const n = new Mtrx([
        [0, 1, 2],
        [4, 5, 6],
        [6, 7, 8]
      ])
      const fn = (v, i, j) => (i === 1) ? v : v - 1
      dse(m.mapMtrx(fn), n)
    })
    it('every', function() {
      se(m.everyMtrx((v) => v < 10), true)
      se(m.everyMtrx((v) => v < 9), false)
    })
    it('some', function() {
      se(m.someMtrx((v) => v === 1), true)
      se(m.someMtrx((v) => v < 1), false)
    })
    it('reduce', function() {
      se(m.reduceMtrx((s, v) => s + v), 45)
    })
  })
  describe('some math functions', function() {
    const m = new Mtrx([
      [1, 3, 5],
      [8, 3, 1],
      [7, 3, 8]
    ])
    it('sum', function() {
      se(m.sum(), 39)
      dse(m.sum(0), [9, 12, 18])
      dse(m.sum(1), [16, 9, 14])
    })
    it('min', function() {
      se(m.min(), 1)
      dse(m.min(0), [1, 1, 3])
      dse(m.min(1), [1, 3, 1])
    })
    it('max', function() {
      se(m.max(), 8)
      dse(m.max(0), [5, 8, 8])
      dse(m.max(1), [8, 3, 8])
    })
  })
})
describe('static ', function() {
  describe('create ', function() {
    it('zeros', function() {
      const zeros = new Mtrx([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ])
      dse(Mtrx.zeros(4, 3), zeros)
      dse(Mtrx.zeros(4), Mtrx.zeros(4, 4))
    })
    it('ones', function() {
      const ones = new Mtrx([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ])
      dse(Mtrx.ones(3, 3), ones)
      dse(Mtrx.ones(3), Mtrx.ones(3, 3))
    })
    it('eye', function() {
      const d = new Mtrx([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ])
      dse(Mtrx.eye(3), Mtrx.eye(3, 3))
      dse(Mtrx.eye(3, 3), d)
    })
    it('like', function() {
      const a = [
        [2, 3, 5],
        [93, 4, 2],
      ]
      dse(new Mtrx(a), Mtrx.like(a))
    })
    it('diag', function() {
      const b = [1, 2, 3, 4]
      const c = new Mtrx([
        [1, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 3, 0],
        [0, 0, 0, 4]
      ])
      dse(new Mtrx(b), c)
      dse(Mtrx.diag(b), c)
    })
  })
  describe('judge ', function() {
    const m = [
      [ 1,  -2],
      [34, 0.2]
    ]
    const n = [
      [0, 0],
      [0, 0]
    ]
    const g = [
      [1, 0, 0, 0],
      [0, 9, 0, 0],
      [0, 0, 9, 0],
      [0, 0, 0, 6]
    ]
    it('isMtrx', function() {
      se(Mtrx.isMtrx(new Mtrx()), true)
      se(Mtrx.isMtrx(m), false)
    })
    it('isMtrxLike', function() {
      se(Mtrx.isMtrxLike(new Mtrx()), true)
      se(Mtrx.isMtrxLike(m), true)
      se(Mtrx.isMtrxLike([1, 2]), false)
    })
    it('isDiag', function() {
      const f = [
        [1, 2, 3],
        [1, 2, 3]
      ]
      se(Mtrx.isDiag(n), true)
      se(Mtrx.isDiag(m), false)
      se(Mtrx.isDiag(f), false)
      se(Mtrx.isDiag(g), true)
    })
    it('isSingular', function() {
      const f = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ]
      const h = [
        [1, 0, 0, 0],
        [0, 9, 0, 0],
        [0, 0, 9, 0]
      ]

      se(Mtrx.isSingular(m), false)
      se(Mtrx.isSingular(n), true)
      se(Mtrx.isSingular(f), true)
      se(Mtrx.isSingular(g), false)
      se(Mtrx.isSingular(h), true)
    })
    it('isSameShape', function() {
      const f = [
        [1, 2, 3],
        [1, 2, 3]
      ]

      se(Mtrx.isSameShape(m, n), true)
      se(Mtrx.isSameShape(m, f), false)
    })
  })
  describe('compare ', function() {
    const a = [
      [1, 3, 4],
      [3, 1, 4],
      [0, 4, 8]
    ]
    const m = new Mtrx(a)

    describe('equal', function() {
      it('Same shape', function() {
        const e = [
          [true, true, true],
          [true, true, true],
          [true, true, true]
        ]

        dse(Mtrx.equal(a, a), e)
        dse(Mtrx.equal(m, a), e)

        a[0][0] = 0
        assert.notDeepStrictEqual(Mtrx.equal(m, a), e)
        e[0][0] = false
        dse(Mtrx.equal(m, a), e)
        a[0][0] = 1
      })
      it('Diff shape', function() {
        const n = [[1, 2], [2, 1]]
        assert.throws(() => {
          Mtrx.equal(m, n)
        })
      })
    })
    it('equalAll', function() {
      se(Mtrx.equalAll(a, a), true)
      se(Mtrx.equalAll(m, a), true)

      a[0][0] = 0
      se(Mtrx.equalAll(m, a), false)
      a[0][0] = 1
    })
    it('equalAny', function() {
      se(Mtrx.equalAny(a, a), true)
      se(Mtrx.equalAny(m, a), true)

      a[0][0] = 0
      se(Mtrx.equalAny(m, a), true)
      a[0][0] = 1

      const n = new Mtrx([
        [0, 0, 0],
        [0, 0, 0],
        [1, 0, 0]
      ])
      se(Mtrx.equalAny(m, n), false)
    })
  })
  describe('calculate ', function() {
    const a = [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3]
    ]
    const b = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
    describe('addition', function() {
      it('static addition function, return a new matrix', function() {
        const m = new Mtrx(a),
              n = new Mtrx(a),
              p = new Mtrx(b),
              q = new Mtrx(b)
        const _r = new Mtrx([
          [2, 2, 3],
          [1, 3, 3],
          [1, 2, 4]
        ])

        const r = Mtrx.add(m, p)
        dse(m, n)
        dse(p, q)
        dse(r, _r)
      })
    })
    describe('subtraction', function() {
      it('static subtraction function, return a new matrix', function() {
        const m = new Mtrx(a),
              n = new Mtrx(a),
              p = new Mtrx(b),
              q = new Mtrx(b)
        const _r = new Mtrx([
          [0, 2, 3],
          [1, 1, 3],
          [1, 2, 2]
        ])

        const r = Mtrx.sub(m, p)
        dse(m, n)
        dse(p, q)
        dse(r, _r)
      })
    })
    describe('multiply', function() {
      const a = [
        [1, 2, 0],
        [3, 4, 4],
        [5, 6, 3]
      ]
      it('A * n, return a new matrix', function() {
        const m = new Mtrx(a)
        const n = new Mtrx(a)
        const number = 6
        const _r = new Mtrx([
          [ 6, 12,  0],
          [18, 24, 24],
          [30, 36, 18],
        ])

        const r = Mtrx.mul(m, number)
        dse(m, n)
        dse(r, _r)
        dse(m, n)
      })
      it('A * B, return a new matrix', function() {
        const m = new Mtrx(a),
              n = new Mtrx(a),
              p = new Mtrx(b),
              q = new Mtrx(b)

        const r1 = Mtrx.mul(m, p)
        dse(r1, m)
        dse(m, n)
        dse(q, p)

        const x = new Mtrx([
          [-1.4],
          [ 2.2],
          [ 0.6]
        ])
        const _r2 = new Mtrx([
          [3.0000000000000004],
          [7.000000000000002],
          [8]
        ])

        const r2 = Mtrx.mul(m, x)
        dse(r2, _r2)
      })
    })
    describe('division', function() {
      it('div number', function() {
        const r = Mtrx.div(a, 2)
        const _r = new Mtrx([
          [0.5, 1, 1.5],
          [0.5, 1, 1.5],
          [0.5, 1, 1.5]
        ])
        dse(r, _r)
      })
      it('div matrix', function() {
        const m = new Mtrx(a),
              r1 = Mtrx.div(a, b)
        dse(r1, m)
      })
    })
  })
})
