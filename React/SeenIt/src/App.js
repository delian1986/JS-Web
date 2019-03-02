import React, { Component } from 'react';
import './App.css';
import './styles/site.css'
import { ToastContainer } from 'react-toastify';
import {Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/common/Header';
import Home from './components/Home/Home';
import Catalog from './components/catalog/Catalog';
import Logout from './components/user/Logout';
import PostDetails from './components/post/PostDetails';

import {withAdminAuthorization} from './components/hoc/withAuthorization'



class App extends Component {
  render() {
    return (
      <div className="App">
      <main className="content">
        <Header/>
        <ToastContainer/>
        <Route path='/' exact component={Home}/>
        <Route path='/catalog' exact component={withAdminAuthorization(Catalog)}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/catalog/details/:id' exact component={PostDetails} />
        </main>
      </div>
    );
  }
}

export default App;
