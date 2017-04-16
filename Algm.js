(function() {



  var isZeroRow = (row) => row.every((num) => num === 0);
  var hasZeroRow = (matrix) => matrix.some((row) => isZeroRow(row));

  Algm.isSquare = (matrix) => Algm.rows(matrix) === Algm.cols(matrix);
  Algm.isSingular = (matrix) =>
    (!Algm.isSquare(matrix) ||
     hasZeroRow(matrix) ||
     hasZeroRow(Algm.T(matrix)) ||
     Algm.rank(matrix) !== Algm.rows(matrix))
    ? true : false;

  Algm.isDivable = (matrix, another) => {
    return Algm.isMulable(matrix, another) &&
      !Algm.isSingular(another);
  };
  Algm.divUp = (matrix, another) => (Algm.isDivable(matrix, another))
    ? Algm.mulUp(matrix, Algm.inv(another))
    : matrix;

  Algm.rank = (matrix) => Algm.rows(rowEchelon(matrix));
  Algm.rowEchelon = function(matrix) {
    var e = rowEchelon(matrix),
        rows = Algm.rows(e);
    if (rows === 0) {
      return Algm.zeros(Algm.rows(matrix));
    } else {
      Algm.changeRow(e, Algm.rows(matrix) - rows);
      return e;
    }
  };

  function pmOrder(matrix) {
    var A = Algm.clone(matrix),
        n = Algm.rows(A),
        order = Algm.range(n);
    var swapOf = (i, j, array) => [array[i], array[j]] = [array[j], array[i]];
    for (let k = 0; k < n; k++) {
      var max = 0, maxIndex = 0;
      for (let i = k; i < n; i++) {
        var A_ik = abs(A[i][k]);
        if (A_ik > max) {
          max = A_ik;
          maxIndex = i;
        }
      }

      if (max === 0) throw Error('Singular matrix');

      swapOf(k, maxIndex, order);
      swapOf(k, maxIndex, A);

      for (let i = k + 1; i < n; i++) {
        A[i][k] = A[i][k] / A[k][k];
        for (let j = k + 1; j < n; j++) {
          A[i][j] = A[i][j] - A[i][k] * A[k][j];
        }
      }
    }
    return order;
  }

  var orderToPm = (o) => create((i, j) => (j === o[i]) ? 1 : 0)(o.length);
  var pmToOrder = (matrix) => matrix.map((r) => r.indexOf(1));

  Algm.LUP = function(matrix) {
    const n = Algm.rows(matrix),
          P = orderToPm(pmOrder(matrix));

    var A = Algm.mulUp(P, matrix),
        U = Algm.create(n, n, 0),
        L = Algm.eye(n);

    for (let k = 0; k < n; k++) {
      U[k][k] = A[k][k];

      for (let i = k + 1; i < n; i++) {
        L[i][k] = A[i][k] / U[k][k];
        U[k][i] = A[k][i];
      }

      for (let i = k + 1; i < n; i++) {
        for (let j = k + 1; j < n; j++) {
          A[i][j] = A[i][j] - (L[i][k] * U[k][j]);
        }
      }
    }

    return [L, U, P];
  };

  function LUPSolve(L, U, p, b) {
    const n = Algm.rows(L);
    var x = Algm.array(n),
        y = Algm.array(n);
    for (let i = 0; i < n; i++) {
      var ly = 0;
      for (let j = 0; j < i; j++) {
        ly += L[i][j] * y[j];
      }
      y[i] = b[p[i]] - ly;
    }

    for (let i = n - 1; i >= 0; i--) {
      var ux = 0;
      for (let j = i + 1; j < n; j++) {
        ux += U[i][j] * x[j];
      }
      x[i] = precFloat((y[i] - ux) / U[i][i]);
    }
    return x;
  }

  Algm.inv = function(matrix) {
    const n = Algm.rows(matrix);
    var A = Array(n),
        [L, U, P] = Algm.LUP(matrix),
        p = pmToOrder(P);
    for (let i = 0; i < n; i++) {
      var b = Algm.array(n);
      b[i] = 1;
      A[i] = LUPSolve(L, U, p, b);
    }
    return Algm.T(A);
  };

  function permutationDet(matrix) {
    const n = Algm.rows(matrix);
    var det = 1;
    for (let i = 0; i < n - 1; i++) {
      for (var j = 0; matrix[j][i] !== 1; j++);
      det *= (j % 2 === 0) ? 1 : -1;
      matrix.splice(j, 1);
    }
    return det;
  }

  var diagDet = (matrix) => matrix.reduce((det, r, i) => det * r[i], 1);

  Algm.det = function(matrix) {
    if (!(Algm.isMatrix(matrix) && Algm.isSquare(matrix))) return NaN;
    if (Algm.isSingular(matrix)) return 0;

    var [L, U, P] = Algm.LUP(matrix);
    return precFloat(diagDet(L) * diagDet(U), 5) * permutationDet(P);
  };

  Algm.cof = function(matrix, i, j) {
    const RCfilter = (pass) => (val, index) => (index === pass) ? false : true;
    return matrix.filter(RCfilter(i)).map((r) => r.filter(RCfilter(j)));
  };

  Algm.compan = function(matrix) {
    if (!(Algm.isMatrix(matrix) && Algm.isSquare(matrix))) return [[]];
    if (!Algm.isSingular(matrix)) {
      let A = Algm.mulN(Algm.inv(matrix), Algm.det(matrix));
      for (let i = 0, n = Algm.rows(matrix); i < n; i++) {
        for (let j = 0; j < n; j++) {
          A[i][j] = precFloat(A[i][j], 5);
        }
      }
      return A;
    } else {
      let n = Algm.rows(matrix),
          A = Array(n);
      if (n > 1) {
        for (let i = 0; i < n; i++) {
          A[i] = Array(n);
          for (let j = 0; j < n; j++) {
            A[i][j] = Algm.det(Algm.cof(matrix, i, j));
          }
        }
      } else {
        A[0] = [matrix[0][0]];
      }
      return A;
    }
  };
}).call(this);
