import React, { Component } from 'react';
import Home from '../Home/Home';
// import './Home.css'

class Details extends Component {
  render() {
    const movie=this.props.movies.filter(m=>m._id===this.props.match.params.id)
    return (
      <div className="Home">
        <h1>Story line of {movie[0].title}</h1>
        <p>{movie[0].storyLine}</p>
        <Home 
        movies={this.props.movies}
        username={this.props.username}
        />
      </div>
    );
  }
}

export default Details;
