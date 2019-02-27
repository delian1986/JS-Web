import React, { Component } from 'react';
import LoginForm from '../user/LoginForm'
import RegisterForm from '../user/RegisterForm'
import About from './About';

export default class Home extends Component {
    render = () => {
        return (
            <section id="viewSignIn">
                <div className="welcome">
                <div className="signup">
                <LoginForm />
                <RegisterForm />
                </div>
                <About />
            </div>
            </section>
        )
    }
}