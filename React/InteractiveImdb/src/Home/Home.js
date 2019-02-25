import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import './Home.css'

class Home extends Component {
  
  render() {
    return (
      <div className="Home">
        <h1>All movies</h1>
        <ul className="movies">
          {this.props.movies.map(movie => (
            <li key={movie._id} className="movie">
              <h2>{movie.title}</h2>
              <img src={movie.poster} alt="" />
              {this.props.username ? 
              <>
              <Link to={`/movies/${movie._id}`}><button> Story Line</button></Link>
              <Link to={`/trailers/${movie._id}`}><button> Trailer</button></Link>
              </>
               : null
              }
            </li>)
          )}
        </ul>
      </div>
    );
  }
}

export default Home;
