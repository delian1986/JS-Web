import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
constructor(props){
  super(props)
  this.state={
    username:null,
    password:null,
    email:null
  }

  this.handleChange=this.props.handleChange.bind(this)
  this.handleSubmit=this.props.handleSubmit.bind(this);

}

  render() {
    return (
      <div className="Register">
        <h1>Register</h1>
        <form onSubmit={(e)=>this.handleSubmit(e,this.state,'register')}>
          <label forhtml="username" >Username</label>
          <input type="text" onChange={this.handleChange} placeholder="pepi" name="username" />
          <label forhtml="email">Email</label>
          <input type="text" onChange={this.handleChange} name="email" placeholder="pepi@gmail.com" />
          <label forhtml="password">Password</label>
          <input type="password" onChange={this.handleChange} name="password" placeholder="******" />
          <input type="submit" value="REGISTER" />
        </form>
      </div>
    );
  }
}

export default Register;
