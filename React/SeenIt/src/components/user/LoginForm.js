import React, { Component } from 'react'
// import {Redirect} from 'react-router-dom'


import withFormManager from '../hoc/withFormManager';
import userModel from '../../models/UserModel'
import userService from './../../services/userService'

class LoginForm extends Component {
    render() {
        return (
            <form id="loginForm" onSubmit={this.props.handleSubmit}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" onChange={this.props.handleChange} type="text" value={this.props.username} />
                <label>Password:</label>
                <input name="password" onChange={this.props.handleChange} type="password" value={this.props.password} />
                <input id="btnLogin" type="submit" value="Sign In" />
            </form>
        )   
    }
                                    
}

export default withFormManager(LoginForm,userModel,userService.login)