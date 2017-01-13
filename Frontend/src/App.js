/*
**  App container
*/

import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import FormControl from './components/FormControl';

//<img src={logo} className="App-logo" alt="logo"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tiny URL!</h2>
        </div>
        <FormControl />
      </div>
    );
  }
}

export default App;
