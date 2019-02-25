import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './Header/Header';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import Details from './Details/Details'
import Trailer from './Trailer/Trailer'
import fetcher from '../src/utils/fetcher';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: null,
      isAdmin: false,
      movies: []
    }
    this.logout = this.logout.bind(this)
    this.fetchMovies = this.fetchMovies.bind(this)
  }


  handleChange(e) {
    // console.log(e.target.name," =>", e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })

  }

  componentWillMount() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true'
    if (localStorage.getItem('username')) {
      this.setState({
        username: localStorage.getItem('username'),
        isAdmin: isAdmin
      })
    }
    this.fetchMovies()
  }





  logout() {
    localStorage.clear()
    this.setState({
      username: null,
      isAdmin: false
    })
  }

  async componentDidMount() {
    await this.fetchMovies()
  }



  async fetchMovies() {
    const moviesFromDb = await fetcher.getMovies()
    this.setState({
      movies: moviesFromDb.movies
    })
  }

  async handleSubmit(e, data, action) {
    e.preventDefault();
    const response = await fetcher[action](data)
    console.log(response);

    if (response.errors) {
      response.errors.forEach(e => {
        console.log(e.msg)
        toast.error(e.msg, { closeButton: false });
      })
    } else {
      console.log(response);
      toast.success(response.message, { closeButton: false });
      this.fetchMovies()

      if (action === 'login' && response.username) {
        localStorage.setItem('username', response.username)
        localStorage.setItem('userId', response.userId)
        localStorage.setItem('token', response.token)
        localStorage.setItem('isAdmin', response.isAdmin)

        this.setState({
          username: response.username,
          isAdmin: response.isAdmin
        })

      }
    }
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header
          username={this.state.username}
          isAdmin={this.state.isAdmin}
          logout={this.logout}
        />
        <Switch>
          <Route exact render={
            (props) =>
              <Home
                {...props}
                username={this.state.username}
                movies={this.state.movies}
              />
          }
            path="/"></Route>

          <Route exact render={
            (props) =>
              <Details
                {...props}
                movies={this.state.movies}
                username={this.state.username}
              />
          }
            path="/movies/:id"></Route>

          <Route exact render={
            (props) =>
              <Trailer
                {...props}
                movies={this.state.movies}
                username={this.state.username}
              />
          }
            path="/trailers/:id"></Route>

          <Route path="/create" exact render={
            (props) =>
              this.state.isAdmin ?
                <Create
                  {...props}
                  movies={this.state.movies}
                  username={this.state.username}
                  handleSubmit={this.handleSubmit.bind(this)}
                  handleChange={this.handleChange} /> :
                <Redirect to='/' />
          }></Route>
          <Route render={
            (props) =>
              <Register
                {...props}
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange}
              />
          }
            path="/register">
          </Route>
          <Route render={
            (props) =>
              <Login
                {...props}
                handleSubmit={this.handleSubmit.bind(this)}
                handleChange={this.handleChange}
              />
          } path="/login" >
          </Route>

          <Route render={() => <h1>Not found!</h1>} />
        </Switch>

      </div>
    );
  }
}

export default App;
