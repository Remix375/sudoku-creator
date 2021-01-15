import React from 'react';
import Board from '../Board/Board';
import Button from '../Button/Button'
import './App.css'
import {  backtrack_based, delete_cases  } from '../../utils/utils'

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
            solution: false,
            difficulty: 50
        }
        
        this.changeCase = this.changeCase.bind(this);
        this.reset = this.reset.bind(this);
        this.create = this.create.bind(this);
        this.changeDifficulty = this.changeDifficulty.bind(this)
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
                ]
            }
        )
    }

    create() {
        let tboard = this.state.board;
        let solution = backtrack_based(tboard);

        tboard = delete_cases(solution, 40);
        console.log(tboard);

        this.setState({
            board: tboard,
            solution: solution
        });
    }

    
    changeDifficulty(newDif) {
        this.setState({
            difficulty: newDif
        })
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
                <Button onreset={this.reset} oncreate={this.create}/>
            </div>
        )
    }
}

export default App;