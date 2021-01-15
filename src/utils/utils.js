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
  



export { isNumber };