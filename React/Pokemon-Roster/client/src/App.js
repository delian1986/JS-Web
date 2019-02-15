import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SignUpForm from './components/SignUpForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        {<SignUpForm/>}
      </div>
    );
  }
}

export default App;
