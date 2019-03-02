import React, { Component } from 'react'
import fetcher from '../../infrastructure/fetcher'

import withFormManager from '../hoc/withFormManager';
import userModel from '../../models/UserModel'
import userService from './../../services/userService'


class RegisterForm extends Component {
    render() {
        return (
            <form id="registerForm" onSubmit={this.props.handleSubmit}>
                <h2>Register</h2>
                <label>Username:</label>
                <input name="username" 
                    type="text" 
                    onChange={this.props.handleChange} 
                    value={this.props.username}/>
                <label>Password:</label>
                <input name="password" 
                    type="password" 
                    onChange={this.props.handleChange} 
                    value={this.props.password}/>
                <label>Repeat Password:</label>
                <input name="repeatPassword" type="password" onChange={this.props.handleChange} />
                <input id="btnRegister" type="submit" value="Sign Up" />
            </form>
        )   
    }
                                    
}

export default withFormManager(RegisterForm,userModel,userService.register)