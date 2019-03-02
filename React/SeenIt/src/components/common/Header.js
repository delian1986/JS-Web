import React, { Component } from 'react'
import '../../styles/header.css'
import observer from '../../infrastructure/observer';

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null
        }

        observer.subscribe(observer.events.loginUser,this.userLoggedIn)
    }

    userLoggedIn = username => this.setState({username})

    render() {
        const loggedIn= 
        <div id="profile">
            <span>Hello, {this.state.username}</span>|
            <a href="/logout">logout</a>
        </div>

        return (
            <header>
                <span className="logo">☃</span>
                <span className="header">SeenIt</span>
                {this.state.username ? loggedIn:null}
            </header>
        )
    }
}
