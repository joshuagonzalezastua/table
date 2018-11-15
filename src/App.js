import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabla from './Tabla';
import Formulario from './Formulario';
import CRUD from './CRUD';

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <CRUD />
      </div>
    );
  }
}

export default App;
