import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      username:null,
      password:null,
    }

    this.handleChange=this.props.handleChange.bind(this)
    this.handleSubmit=this.props.handleSubmit.bind(this);
  }
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={(e)=>this.handleSubmit(e,this.state,'login')}>
          <label htmlFor="usernameLogin">Username</label>
          <input type="text" onChange={this.handleChange} name="username" placeholder="Ivan Ivanov" />
          <label htmlFor="passwordLogin">Password</label>
          <input type="password" onChange={this.handleChange} name="password" password="password" placeholder="******" />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
