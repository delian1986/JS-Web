import React, {Component} from 'react';
import './App.css';
import AppHeader from "./App/AppHeader";
import AppContent from "./App/AppContent";
import AppFooter from "./App/AppFooter";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            games: [],
            hasFetched: false,
            loginForm: false,
        }
    }

    registerUser(user) {
        fetch('http://localhost:9999/auth/signup',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response=>response.json())
        .then(body =>{
            if(body.errors){
                body.errors.forEach(e=>{
                    console.log(e.msg)
                })
            }else{
                console.log(body.message);
                localStorage.setItem('username',body.username)
                localStorage.setItem('userId',body.userId)
                this.setState({
                    user:body.username
                })
            }

        })
        .catch((e)=>console.log(e))
    }

    loginUser(user) {
        // TODO: login a user and set sessionStorage items username and token
        // console.log(user)
        fetch('http://localhost:9999/auth/signin',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response=>response.json())
        .then(body =>{
            if(body.errors){
                body.errors.forEach(e=>{
                    console.log(e.msg)
                })
            }else{
                console.log(body.message);
                // console.log(body);
                localStorage.setItem('username',body.username)
                localStorage.setItem('userId',body.userId)
                localStorage.setItem('token',body.token)
                this.setState({
                    user:body.username
                })
            }

        })
        .catch((e)=>console.log(e))
    }

    logout(event) {
       // TODO: prevent the default state
       // TODO: delete the data from the sessionStorage
       // TODO: update the state (user: null)
       localStorage.clear()
       this.setState({
           user:null
       })
    }

    componentWillMount() {
        // TODO: check if there is a logged in user using the sessionStorage (if so, update the state, otherwise set the user to null)
        const localUsername=localStorage.getItem('username')
        if(localUsername){
            this.setState({
                user:localUsername
            })
        }

        
       // TODO: fetch all the games
       this.fetchGames()
    }

    createGame(data) {
        // TODO: create a game using fetch with a post method then fetch all the games and update the state 
        fetch('http://localhost:9999/feed/game/create',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response=>response.json())
        .then(body =>{
            if(body.errors){
                body.errors.forEach(e=>{
                    console.log(e.msg)
                })
            }else{
                
                console.log(body.message);
                this.fetchGames()
                
            }
        })
        .catch((e)=>console.log(e))
    }

    fetchGames(){
        fetch("http://localhost:9999/feed/games")
        .then(data=>data.json())
        .then(body=>{
            console.log(body.message)
 
            this.setState({
                games:body.games
            })
        })
        .catch((e)=>console.log(e))
    }

    switchForm() {
        // TODO: switch the value of the loginForm property
        this.setState({
            loginForm: !this.state.loginForm
        })
    }

    render() {
        return (
            <main>
                <AppHeader
                    user={this.state.user}
                    logout={this.logout.bind(this)}
                    switchForm={this.switchForm.bind(this)}
                    loginForm={this.state.loginForm}
                />
                <AppContent
                    registerUser={this.registerUser.bind(this)}
                    loginUser={this.loginUser.bind(this)}
                    games={this.state.games}
                    createGame={this.createGame.bind(this)}
                    user={this.state.user}
                    loginForm={this.state.loginForm}
                />
                <AppFooter/>
            </main>
        )
    }
}

export default App;


