import React from "react";
import RegisterForm from "./RegisterForm";
import LogInForm from "./LoginForm";
import CreateForm from "../Games/CreateForm";

class DynamicForm extends React.Component {

    render() {
        // let loggedIn= this.props.loginForm ? <LogInForm/> : <RegisterForm/>
        return (
            <div>
                <div>
                {this.props.loginForm ?
                    <RegisterForm registerUser={this.props.registerUser}/>:
                    <LogInForm/>}
                </div>
            </div>
        )
    }
}

export default DynamicForm