import React, { Component } from 'react';
import Home from '../Home/Home';
import ReactPlayer from 'react-player'

class Trailer extends Component {
  render() {
    const movie=this.props.movies.filter(m=>m._id===this.props.match.params.id)
    return (
      <div className="Home">
        <h1>Trailer of {movie[0].title}</h1>
        <ReactPlayer url={movie[0].trailerUrl} playing />
        <Home 
        movies={this.props.movies}
        username={this.props.username}
        />
      </div>
    );
  }
}

export default Trailer;
