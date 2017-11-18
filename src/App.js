import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hangman from './Hangman';


class App extends Component {

  constructor() {
    super();
    this.state = {
      word: "",
    }
  }

  render() {
    return (
      <div className="App">
        
        <Hangman />
      </div>
    );
  }
}

export default App;
