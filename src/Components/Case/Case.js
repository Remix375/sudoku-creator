import React from 'react';
import './Case.css'
import Utils from '../../utils/utils'

class Case extends React.Component {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        //fonction pour changer la valeur des cases dans le state de App.js
        if(e.target.value === ''){
            this.props.onChangeCase(this.props.lineIndex, this.props.caseIndex, '0')
        }
        if(Utils.isNumber(e.target.value)) {
            const value = parseInt(e.target.value)
            if(value<=9 && value>=1){
                this.props.onChangeCase(this.props.lineIndex, this.props.caseIndex, e.target.value)
            }
        }
    }

    render() {
        let value = this.props.boardData[this.props.lineIndex][this.props.caseIndex][0] !== 0 ? this.props.boardData[this.props.lineIndex][this.props.caseIndex][0] : '';
        //class border
        let borderside;
        let borderbottom
        if (this.props.lineIndex === 2 || this.props.lineIndex === 5){
            borderbottom = 'bottom'
        }
        if (this.props.caseIndex === 2 || this.props.caseIndex === 5) {
            borderside = 'side'
        }

        //classe couleur
        let couleur = this.props.boardData[this.props.lineIndex][this.props.caseIndex][1] === 'b' ? 'black' : 'red'

        return (
            

            <input className={`case ${borderbottom} ${borderside} ${couleur}`}  onChange={this.onChange} value={value}></input>
        )
    }

}

export default Case;