import React from 'react';
import './Button.css';

class Button extends React.Component {
    constructor(props) {
        super(props)
        this.changeDifficulty = this.changeDifficulty.bind(this);
    }

    changeDifficulty(e) {
        this.props.changeDificulte(e.target.id === 'ez' ? 30 : e.target.id === 'moyen' ? 50 : 70)

    }
    

    render() {
        return (
            <div>
                <div id='basics'>
                    <button id='reset' onClick={this.props.onreset}>Reset</button>
                    <button id='create' onClick={this.props.oncreate}>Create</button>
                </div>
                <div id = 'difficulte'>
                    <h1>Difficulte du sudoku: {this.props.difficulte===30?'Ez': this.props.difficulte===50? 'moyen' : 'Dur'}</h1>
                    <button id='ez' className='dif' onClick={this.changeDifficulty}>EZ</button>
                    <button id='moyen' className='dif' onClick={this.changeDifficulty}>Moyen</button>
                    <button id='dur' className='dif' onClick={this.changeDifficulty}>Dur</button>
                </div>
                <button onClick={this.props.onshowSolution} id='solution'>Solution</button>
            </div>
        )
    }
}

export default Button;