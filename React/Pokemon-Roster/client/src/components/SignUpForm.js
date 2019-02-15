import React, { Component } from 'react';

class SignUpForm extends Component {
    constructor() {
        super()

        this.state = {
            form: {}
        }
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(e) {
        const name=e.target.dataset.name
        const value=e.target.value

        const newObj={}
        newObj[name]=value

        this.setState({
            form:Object.assign(this.state.form,newObj)
        })
    }

    handleSubmit(){
        
    }

    render() {
        return (
            < form >
                <div className="form-group">
                    <label htmlFor="input-email">Email address</label>
                    <input type="email" data-name="email" onChange={this.handleChange} className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="input-username">Username</label>
                    <input type="text" data-name="name" onChange={this.handleChange} className="form-control" id="username" placeholder="Username" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="input-password">Password</label>
                    <input type="password" data-name="password" onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form >
        )
    }
}

export default SignUpForm