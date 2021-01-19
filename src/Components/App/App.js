import React from 'react';
import Board from '../Board/Board';
import Button from '../Button/Button'
import './App.css'
import Utils from '../../utils/utils'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            taille: 9,
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
            difficulty: 50,
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
        
        this.changeCase = this.changeCase.bind(this);
        this.reset = this.reset.bind(this);
        this.create = this.create.bind(this);
        this.changeDifficulty = this.changeDifficulty.bind(this);
        this.showSolution = this.showSolution.bind(this);
    }

    changeCase(lineIndex, caseIndex, value) {
        const boardCopy = this.state.board;
        boardCopy[lineIndex][caseIndex] = parseInt(value);
        this.setState(
            {
                board: boardCopy
            }
        )
    }

    reset() {
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

    async create() {
        let sol = Utils.randomGrid([
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
        console.log(sol)
        let solution = JSON.parse(JSON.stringify(sol));
        let grid = Utils.delete_cases(sol, this.state.difficulty)

        this.setState({
            board: grid,
            solution: solution,
            showSolution: false,
            randomBoard: true
        });
    }

    changeDifficulty(newDif) {
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