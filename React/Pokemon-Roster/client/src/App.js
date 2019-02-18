import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SignUpForm from './components/SignUpForm'
import LoginForm from './components/LoginForm'
// import AddPokemonForm from './components/logged-in/AddPokemonForm'
import LoggedInScreen from './components/logged-in/LoggedInScreen'

class App extends Component {
  constructor(){
    super()

    let route=''

    if(localStorage.getItem('token')){
      route='loggedIn'
    }
    this.state={
      route
    }

    this.showAppropriateComponent=this.showAppropriateComponent.bind(this)
    this.switchLoginSignUp=this.switchLoginSignUp.bind(this)
  }

  showAppropriateComponent(){
    if(this.state.route==='login'){
      return <LoginForm/>
    }else if(this.state.route==='loggedIn'){
          return <LoggedInScreen/>
    }
    return <SignUpForm/>
  }

  setLoggedIn(){
    this.setState({route:'loggedIn'})
  }

  switchLoginSignUp(){
    if(this.state.route==='login'){
        this.setState({route:''})
    }else{
        this.setState({route:'login'})

    }
}

  render() {
    return (
      <div className="App">
        <button onClick={this.switchLoginSignUp} className="btn btn-link">Change form</button>
        {this.showAppropriateComponent()}
      </div>
    );
  }
}

export default App;
