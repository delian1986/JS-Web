import React, { Component } from 'react'
import fetcher from '../../infrastructure/fetcher'
import {Redirect} from 'react-router-dom'

import { toast } from 'react-toastify';
import observer from '../../infrastructure/observer';


export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(e) {
        // console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e) {
        e.preventDefault()
        const user = this.state
        const res = await fetcher.login(user)
        console.log(res);
        if(res.success){
            localStorage.setItem('token',res.token)
            localStorage.setItem('username',res.user.username)
            // localStorage.setItem('userId',res.userId)
            // localStorage.setItem('isAdmin',res.isAdmin)
            toast.success(res.message)
            observer.trigger(observer.events.loginUser,res.user.username)
        }else{
            toast.error(res.message)
        }
        
    }

    render() {
        return (
            <form id="loginForm" onSubmit={this.handleSubmit}>
                <h2>Sign In</h2>
                <label>Username:</label>
                <input name="username" onChange={this.handleChange} type="text" value={this.props.username} />
                <label>Password:</label>
                <input name="password" onChange={this.handleChange} type="password" value={this.props.password} />
                <input id="btnLogin" type="submit" value="Sign In" />
            </form>
        )   
    }
                                    
}