import React, { Component } from 'react';


class Gameover extends Component {

    render() {
        if (this.props.victory) {
            return (
                <div>
                    <p>
                        Congratulations!
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <p>
                        You lose! The word was: {this.props.word}
                    </p>
                    <img src='gallows/gallows6.jpg' alt="Gallows"/>
                </div>
            );
        }
    }

}

export default Gameover;