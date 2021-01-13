import React from 'react';
import './Button.css';

class Button extends React.Component {

    render() {
        return (
            <div>
                <button id='reset' onClick={this.props.onreset}>Reset</button>
            </div>
        )
    }
}

export default Button;