import React from 'react';
import './Case.css'
import Utils from '../../utils/utils'

class Case extends React.Component {
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        if(e.target.value === ''){
            this.props.onChangeCase(this.props.lineIndex, this.props.caseIndex, e.target.value)
        }
        if(Utils.isNumber(e.target.value)) {
            const value = parseInt(e.target.value)
            if(value<=9 && value>=1){
                this.props.onChangeCase(this.props.lineIndex, this.props.caseIndex, e.target.value)
            }
        }
    }

    render() {
        return (
            <input className='case' type='number' min='1' max='9' onChange={this.onChange} value={(this.props.boardData[this.props.lineIndex][this.props.caseIndex] !== 0) ? this.props.boardData[this.props.lineIndex][this.props.caseIndex] : ''}></input>
        )
    }

}

export default Case;