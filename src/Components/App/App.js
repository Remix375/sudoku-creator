import React from 'react';
import Board from '../Board/Board';
import Button from '../Button/Button'
import './App.css'
import Utils from '../../utils/utils'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            started: false,

            //inutile pour l'instant
            taille: 9,
            //nombre de cases a enlever
            difficulty: 50,
            //sudoku fini
            showSolution: false,
        }
        

        //bind fonctions
        this.changeCase = this.changeCase.bind(this);
        this.reset = this.reset.bind(this);
        this.create = this.create.bind(this);
        this.changeDifficulty = this.changeDifficulty.bind(this);
        this.showSolution = this.showSolution.bind(this);
        this.start = this.start.bind(this);
    }


    //synchroniser app et ecran  toutes les cases changees sont changees ds le state
    changeCase(lineIndex, caseIndex, value) {
        //prendre board et couleur
        const boardCopy = this.state.board;
        console.log(boardCopy)
        //modifier avec nouvelle valeur
        boardCopy[lineIndex][caseIndex][0] = parseInt(value);

        for (let i=0; i<boardCopy.length; i++) {
            for (let k=0; k<boardCopy.length; k++) {
                boardCopy[i][k][1] = 'w'
            }    
        }

        if (parseInt(value) === 0) {
            boardCopy[lineIndex][caseIndex][1] = 'w'
        } else if (boardCopy[lineIndex][caseIndex][0] === this.state.solution[lineIndex][caseIndex][0]) {
            boardCopy[lineIndex][caseIndex][1] = 'g'
            boardCopy[lineIndex][caseIndex][2] = false
        } else {
            boardCopy[lineIndex][caseIndex][1] = 'r'
        }
        //set nouvelle board
        this.setState(
            {
                board: boardCopy,
            }
        )
    }

    reset() {
        let board = Utils.createStateGrid()
        //remettre les params au debut
        this.setState(
            {
                board: board,
                solution: board,
                showSolution: false,
                randomBoard: false
            }
        )
    }

    create() {
        //appeler fonction randomGrid dans utils avec grille base
        //retourne une grille aleatoire remplie
        const sol = Utils.backtrack_based([
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ])

        //solution: la grille remplie
        const solution = Utils.createStateGrid(JSON.parse(JSON.stringify(sol)));

        //supprimer des cases de la grille
        const grid = Utils.createStateGrid(Utils.delete_cases(sol, this.state.difficulty));

        this.setState({
            board: grid,
            solution: solution,
            showSolution: false,
            randomBoard: true
        });
    }

    changeDifficulty(newDif) {
        //changer nombre de cases a enlever
        this.setState({
            difficulty: newDif
        })
    }

    showSolution() {
        if (this.state.randomBoard) {
            this.setState({
                showSolution: true
            })            
        }
    }

    useless() {
        //passer fonction inutile
        return
    }

    start() {
        let board = Utils.createStateGrid()
        console.log(board)

        
        this.setState(
            {started: true,
            board: board}
        )
    }


    render() {
        if (!this.state.started) {
            return (
                <button onClick={this.start}>Start</button>
            )
        }

        return (
            <div id='wrapper'>
                <h1 id='title'>Sudoku</h1>
                <Board 
                    taille={this.state.taille} 
                    onChangeCase={this.changeCase}
                    boardData={this.state.board}
                />
                {this.state.showSolution == true ? <Board boardData={this.state.solution} onChangeCase={this.useless} taille={this.state.taille} /> : ''}
                <Button 
                onreset={this.reset} 
                oncreate={this.create} 
                difficulte={this.state.difficulty} 
                changeDificulte={this.changeDifficulty} 
                onshowSolution={this.showSolution} />
            </div>
        )
    }
}

export default App;