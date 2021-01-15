import React from 'react';
import './Button.css';

class Button extends React.Component {

    oncreate(){
        
    }

    render() {
        return (
            <div>
                <button id='reset' onClick={this.props.onreset}>Reset</button>
                <button id='create' onClick={this.props.oncreate}>Create</button>
            </div>
        )
    }
}

export default Button;