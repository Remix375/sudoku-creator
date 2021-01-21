import React from 'react';
import Board from '../Board/Board';
import Button from '../Button/Button'
import './App.css'
import Utils from '../../utils/utils'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //inutile pour l'instant
            taille: 9,
            //sudoku a remplir
            board:  [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            //nombre de cases a enlever
            difficulty: 50,
            //sudoku fini
            solution:[
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            showSolution: false
        }
        

        //bind fonctions
        this.changeCase = this.changeCase.bind(this);
        this.reset = this.reset.bind(this);
        this.create = this.create.bind(this);
        this.changeDifficulty = this.changeDifficulty.bind(this);
        this.showSolution = this.showSolution.bind(this);
    }


    //synchroniser app et ecran  toutes les cases changees sont changees ds le state
    changeCase(lineIndex, caseIndex, value) {
        //prendre board
        const boardCopy = this.state.board;
        //modifier avec nouvelle valeur
        boardCopy[lineIndex][caseIndex] = parseInt(value);
        //set nouvelle board
        this.setState(
            {
                board: boardCopy
            }
        )
    }

    reset() {
        //remettre les params au debut
        this.setState(
            {
                board: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                ],
                solution: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                ],
                showSolution: false,
                randomBoard: false
            }
        )
    }

    create() {
        //appeler fonction randomGrid dans utils avec grille base
        //retourne une grille aleatoire remplie
        let sol = Utils.backtrack_based([
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

        //solution est les grille remplie
        let solution = JSON.parse(JSON.stringify(sol));

        //supprimer des cases de la grille
        let grid = Utils.delete_cases(sol, this.state.difficulty)

        this.setState({
            board: grid,
            solution: solution,
            //showSolution: false,
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

    render() {
        return (
            <div id='wrapper'>
                <h1 id='title'>Sudoku</h1>
                <Board 
                    taille={this.state.taille} 
                    onChangeCase={this.changeCase}
                    boardData={this.state.board}
                />
                {this.state.showSolution == true ? <Board boardData={this.state.solution} onChangeCase={this.useless} taille={this.state.taille} /> : ''}
                <Button onreset={this.reset} oncreate={this.create} difficulte={this.state.difficulty} changeDificulte={this.changeDifficulty} onshowSolution={this.showSolution} />
            </div>
        )
    }
}

export default App;