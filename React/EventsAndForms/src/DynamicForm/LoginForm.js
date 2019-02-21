import React from 'react';
import './login.css';

class LogInForm extends React.Component {

    constructor(props){
        super(props)
        this.state={
            username:null,
            password:null
        }
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(e){
        // console.log([e.target.name],e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render() {
        return (
            <div className="Login">
                <h1>Login</h1>
                <form onSubmit={(event) => {
                   // TODO: prevent the default behavior of the event and use the loginUser function by passing it the data from the form
                   event.preventDefault()
                    this.props.loginUser(this.state)
                }}>
                    <label>Usersname</label>
                    <input name="username" onChange={this.handleChange} type="text" id="usernameLogin"/>
                    <label>Password</label>
                    <input name="password" onChange={this.handleChange} type="password" id="passwordLogin"/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }
}

export default LogInForm;
