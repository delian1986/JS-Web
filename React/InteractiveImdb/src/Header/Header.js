import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


class Header extends Component {
  render() {
    return (
      <header>
        <NavLink to="/" className="logo">Interactive IMDB</NavLink>
        <div className="header-right">
          <NavLink to="/">Home</NavLink>

            {this.props.isAdmin ?
            (<NavLink to="/create">Create</NavLink>) : null
            }


          {this.props.username ?
          (<span>
            <a href="/">Welcome {this.props.username}!</a>
            <a href='javascript:void(0)' onClick={this.props.logout}>Logout</a>
            </span>)
                    
          :

          (<span>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
            </span>)
          }
          
        </div>
      </header>
    );
  }
}

export default Header;
