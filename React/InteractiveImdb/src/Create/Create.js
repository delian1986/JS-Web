import React, { Component } from 'react';
import './Create.css';
import Home from '../Home/Home';

class Create extends Component {
  constructor(props){
    super(props)
    this.state={
      title:null,
      storyLine:null,
      trailerUrl:null,
      poster:null
    }

    this.handleChange=this.props.handleChange.bind(this)
    this.handleSubmit=this.props.handleSubmit.bind(this);
  }
  render() {
    return (
      <div className="Create">
        <h1>Create Movie</h1>
        <form onSubmit={(e)=>this.handleSubmit(e,this.state,'create')}>
        <label htmlFor="title">Title</label>
        <input type="text" onChange={this.handleChange} name="title" placeholder="Titanic"/>
        <label htmlFor="storyLine">Story Line</label>
        <input type="text" onChange={this.handleChange} name="storyLine" placeholder="Text"/>
        <label htmlFor="trailerUrl">Trailer Url</label>
        <input type="text" onChange={this.handleChange} name="trailerUrl" placeholder="https://www.youtube.com/watch?v=DNyKDI9pn0Q"/>
        <label htmlFor="poster">Movie Poster</label>
        <input type="text" onChange={this.handleChange} name="poster" placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzg6o0KjhufKFU1iBNr1zuyi0YDNgCUw4Ky5SNATZDVKaIUkiAA"/>
        <input type="submit" value="Create"/>
        </form>
        <Home 
        movies={this.props.movies}
        username={this.props.username}
        />
      </div>
    );
  }
}

export default Create;
