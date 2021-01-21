import React from 'react';
import Line from '../Line/Line'
import './Board.css'

class Board extends React.Component {
    render() {
        let lines = []
        const taille = this.props.taille
        for(let i=0; i<taille; i++) {
            lines.push(<tr>
                <Line 
                key={i} 
                lineIndex={i} 
                taille={taille} 
                onChangeCase={this.props.onChangeCase} 
                boardData={this.props.boardData}/>
                </tr>)
        }

        return (
            <table>
                {lines}
            </table>
        )
    }
}

export default Board;