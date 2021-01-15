function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }



const square_coordinates = [
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [1, 1, 1, 2, 2, 2, 3, 3, 3],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [4, 4, 4, 5, 5, 5, 6, 6, 6],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9],
  [7, 7, 7, 8, 8, 8, 9, 9, 9]
]


function get_row(board, row) {
  // Given a board, we can return a single row
  return board[row]
}

function get_column(board, column) {
  // Given a board, we iterate the rows to return a column
  var col = []
  for (let row = 0; row < 9; row++) {
    col.push(board[row][column]);
  }
  return col
}

function get_square(board, square) {
  let cells = []
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (square === square_coordinates[r][c]) {
        cells.push(board[r][c])
      }
    }
  }
  return cells
}


function complete_cell(board, r, c) {
  let used = [...get_row(board, r), ...get_column(board, c), ...get_square(board, square_coordinates[r][c])]
  let possibilities = []
  for (let p = 1; p <= 9; p++) {
    if (!used.includes(p)) {
      possibilities.push(p)
    }
  }
  if (possibilities.length === 1) {
    // If there is only one valid possibility, fill it in
    board[r][c] = possibilities[0]
    return true
  } else {
    board[r][c] = possibilities
    return false
  }
}


function compare(expected, actual) {
  let array1 = expected.slice()
  let array2 = actual.slice()
  return array1.length === array2.length && array1.sort().every(function (value, index) { return value === array2.sort()[index] });
}

function is_solved(board) {
  let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let valid = true
  // Check all rows
  for (let r = 0; r < 9 && valid === true; r++) {
    if (!compare(expected, get_row(board, r))) {
      valid = false
    }
  }
  // Check all columns
  for (let c = 0; c < 9 && valid === true; c++) {
    if (!compare(expected, get_column(board, c))) {
      valid = false
    }
  }
  // Check all quadrants
  for (let q = 1; q < 9 && valid === true; q++) {
    if (!compare(expected, get_square(board, q))) {
      valid = false
    }
  }
  return valid
}




function backtrack_based(orig_board) {
  // Create a temporary board for our recursion.
  let board = JSON.parse(JSON.stringify(orig_board));
  if (is_solved(board)) {
    board = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
  };
  for (let r =0; r < 9; r++) {
    let c_ = Math.floor(Math.random() * 9);
    for (let c_loop=c_; c_loop < c_+9; c_loop++) {
      let c = c_loop %9
      console.log(c, r)

      if (board[r][c] === 0) {
        complete_cell(board, r, c)
        if (is_solved(board)) return board;
        let cell = board[r][c%10]
        if (Array.isArray(cell)) {
          for (let i = 0; i < cell.length; i++) {
            // Create a temporary board for each recursion.
            let board_2 = JSON.parse(JSON.stringify(board));
            // Choose a value
            board_2[r][c] = cell[i]
            // Recurse again using new board
            let completed_board = backtrack_based(board_2)
            if (completed_board) {
              return completed_board;
            }
          }
          return false // dead end
        }
      }
    }
  }
  return false;
}


function delete_cases(orig_Board, dif) {
  let board = orig_Board
  for(let i=0; i<dif;i++) {
    const r = Math.floor(Math.random() * 9)
    const c = Math.floor(Math.random() * 9)
    board[r][c] = 0
  }
  return board
}




export { isNumber, backtrack_based, delete_cases }; 