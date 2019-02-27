import React, { Component } from 'react'
import fetcher from '../../infrastructure/fetcher'

import { toast } from 'react-toastify';


export default class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            repeatPassword:null
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
        const res = await fetcher.register(user)
        console.log(res);
        if(res.success){
            // localStorage.setItem('token',res.token)
            // localStorage.setItem('username',res.user.username)
            // localStorage.setItem('userId',res.userId)
            // localStorage.setItem('isAdmin',res.isAdmin)
            toast.success(res.message)
        }else{
           Object.entries(res.errors).forEach(([e,msg])=>{
                toast.error(msg)
           })
        }
        
    }

    render() {
        return (
            <form id="registerForm" onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <label>Username:</label>
                <input name="username" 
                    type="text" 
                    onChange={this.handleChange} 
                    value={this.props.username}/>
                <label>Password:</label>
                <input name="password" 
                    type="password" 
                    onChange={this.handleChange} 
                    value={this.props.password}/>
                <label>Repeat Password:</label>
                <input name="repeatPassword" type="password" onChange={this.handleChange} />
                <input id="btnRegister" type="submit" value="Sign Up" />
            </form>
        )   
    }
                                    
}