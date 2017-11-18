import React, { Component } from 'react';
import Gameover from './Gameover';
import axios from 'axios';

class Hangman extends Component {

    constructor(state) {
        super(state);
        this.state = {
            alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
            word: "",
            started: false
        }
        axios.get("http://setgetgo.com/randomword/get.php").then(res => {
            console.log(res);
            this.setState({word: res.data.toUpperCase()});
            this.setState({
                currentBoard: Array(this.state.word.length).fill("_"),
                guessedLetters: [],
                guessesLeft: Math.min(6, (new Set(this.state.word)).size - 1),
            });
        });

    }

    onClick(e) {

        const letter = e.target.value;
        const guessedLetters = this.state.guessedLetters.slice();
        guessedLetters.push(letter);

        if (this.state.word.indexOf(letter) !== -1) {
            this.state.word.split("").forEach((l, index) => {
                if (l === letter) {
                    this.state.currentBoard.splice(index, 1, l);
                }
            })
        } else {
            this.setState({ guessesLeft: this.state.guessesLeft - 1 });
        }
        this.state.alphabet.splice(this.state.alphabet.indexOf(letter), 1);
        this.setState({ guessedLetters: guessedLetters });
    }

    startGame() {
        this.setState({started: true});
    }

    render() {

        if (!this.state.started) return (
            <div className="container">
            <header className='center'>
              <h1>H A N G M A N</h1>
              <h4> Let’s Play a Game ; )</h4>
            </header>
            <div className='spacing center'>
              <p>In this classic game, there will be a gameboard that is spaced out with the same amount of letters that make up a hidden word.<br/> Click on a remaining alphabet letters to guess if the letter exists in the word. <br/> If the letter exists, it will be displayed on the game board. If not, then a new body part will be added to the Gallows... DAH DAH DAH :scream:<br />SIX STRIKES and his whole body is hanging, then you lose!</p>
              <h3>GOOD LUCK 🤞</h3>
            </div>
            <button onClick={this.startGame.bind(this)}> Start game </button>
        </div>)

        if (this.state.currentBoard.indexOf("_") === -1 || !this.state.guessesLeft) {
            return <div id="game"> <Gameover victory={!!this.state.guessesLeft} word={this.state.word} /> </div>
        }
        else {
            const stick = {
                1: "  O  \n /|\\ \n / \\ ",
                2: "  O  \n /|\\ \n /   ",
                3: "  O  \n /|\\ \n     ",
                4: "  O  \n /|  \n     ",
                5: "  O  \n  |  \n     ",
                6: "  O  \n     \n     ",
            }

            return (
                <div id="game">

                    {this.state.alphabet.map((letter, index) => {
                        return (
                            <button key={index} className="letter-button" name={letter} value={letter}
                                onClick={this.onClick.bind(this)}>{letter}</button>
                        );
                    })}
                    <br />
                    <div>
                        <pre className="letters">{this.state.currentBoard.join("  ")}</pre>
                    </div>
                    <pre id="hangman-stick">
                        {stick[this.state.guessesLeft]}
                    </pre>
                </div>
            );
        }
    }
}

export default Hangman;