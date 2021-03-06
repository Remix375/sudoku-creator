
//objet avec fonctions utiles pour projet
//importe dans App.js

const Utils = {

  //verifier si une variable est un nombre
  isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) },

  //pour verifier les carres de 3
  square_coordinates: [
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [1, 1, 1, 2, 2, 2, 3, 3, 3],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [4, 4, 4, 5, 5, 5, 6, 6, 6],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9],
    [7, 7, 7, 8, 8, 8, 9, 9, 9]
  ],
  
  
  get_row(board, row) {
    // retourne la ligne
    return board[row]
  },
  
  get_column(board, column) {
    // retourne une colonne
    var col = []
    for (let row = 0; row < 9; row++) {
      col.push(board[row][column]);
    }
    return col
  },
  
  get_square(board, square) {
    //recup carre de 3
    let cells = []
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (square === this.square_coordinates[r][c]) {
          cells.push(board[r][c])
        }
      }
    }
    return cells
  },
  
  
  complete_cell(board, r, c) {
    //used liste des valeurs que l'on ne peut pas utiliser dans la case
    let used = [...this.get_row(board, r), ...this.get_column(board, c), ...this.get_square(board, this.square_coordinates[r][c])]

    let possibilities = []
    //mettre les valeurs qui ne sont pas dans used dans possibilities
    for (let p = 1; p <= 9; p++) {
      if (!used.includes(p)) {
        possibilities.push(p)
      }
    }
    if (possibilities.length === 1) {
      // Si il n'y a qu'une possibilite, la remplire
      board[r][c] = possibilities[0]
      return true
    } else {
      // remplir la case avec la liste de possibilites
      board[r][c] = possibilities
      return false
    }
  },
  
  
  compare(expected, actual) {
    let array1 = expected.slice()
    let array2 = actual.slice()
    return array1.length === array2.length && array1.sort().every(function (value, index) { return value === array2.sort()[index] });
  },
  
  is_solved(board) {
    //verifier si la grille est resolue

    let expected = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let valid = true
    // verifier les lignes
    for (let r = 0; r < 9 && valid === true; r++) {
      if (!this.compare(expected, this.get_row(board, r))) {
        valid = false
      }
    }
    // verifier les colonnes
    for (let c = 0; c < 9 && valid === true; c++) {
      if (!this.compare(expected, this.get_column(board, c))) {
        valid = false
      }
    }
    // verifier les carres 3x3
    for (let q = 1; q < 9 && valid === true; q++) {
      if (!this.compare(expected, this.get_square(board, q))) {
        valid = false
      }
    }
    return valid
  },
  

  
  backtrack_based(orig_board) {
    // creer une board temporaire pour la recursion
    let board = JSON.parse(JSON.stringify(orig_board));
    
    for (let r =0; r < 9; r++) {
      //boucle c commence a chaque fois aleatoirement pour remplire les cases dans des ordres differents et avoir une grille aleatoir
      let c_ = Math.floor(Math.random() * 9);
      for (let c_loop=c_; c_loop < c_+9; c_loop++) {
        let c = c_loop %9
        

        if (board[r][c] === 0) {
          //essayer de completer la case et verifier si sudoku est fini
          this.complete_cell(board, r, c)
          if (this.is_solved(board)){
            return board;
          }

          let cell = board[r][c]

          //si la case n'est pas remplie et est donc une array
          if (Array.isArray(cell)) {

            //possibilite de choisir valeur aleatoire de la liste de valeurs pour commencer recursion pour plus d'aleatoire en plus de la boucle qui commence par des cases aleatoires

            for (let i = 0; i < cell.length; i++) {
              // board temporaire pour chaque recursion.
              let board_2 = JSON.parse(JSON.stringify(board));
              // choisir valeur
              board_2[r][c] = cell[i]
              // Recursion avec nouvelle board avec premiere valeur de la liste des possibilites
              let completed_board = this.backtrack_based(board_2)
              if (completed_board) {
                return completed_board
              }
            }
            return false // marche pas
          }
        }
      }
    }
    return false;
  },
  
  
  delete_cases(origi_Board, dif) {
    //supprimer des cases de la grille remplie
    let nboard = origi_Board;
    for(let i=0; i<dif;i++) {
      const r = Math.floor(Math.random() * 9)
      const c = Math.floor(Math.random() * 9)
      nboard[r][c] = 0
    }
    return nboard
  },


  //create grid for state
  //dont pass argument to create empty grid
  createStateGrid(grid) {
    let gridCopy = grid
    if (!grid){
      gridCopy = [
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
    }


    let returnGrid = [];
    for (let i = 0; i<gridCopy.length; i++){
      let line = []

        for (let k = 0; k<gridCopy[0].length; k++){
            if (gridCopy[i][k] === 0) {
                line.push([gridCopy[i][k], 'b', true]);
            } else {
                line.push([gridCopy[i][k], 'b', false]);
            }
        }  
        returnGrid.push(line)
    }
    return returnGrid;
}
}

export default Utils;