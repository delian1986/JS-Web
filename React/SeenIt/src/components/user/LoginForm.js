import React, {Component} from 'react'
import fetcher from '../../infrastructure/fetcher'

export default class LoginForm extends Comment{
    constructor(props){
        super(props)

        this.state={
            username:null,
            password:null
        }
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const user=this.state
        fetcher('/auth/signin',user)
    }

    render(){
        
    }

}