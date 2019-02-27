import React, { Component } from 'react';
import './App.css';
import './styles/site.css'
import { ToastContainer } from 'react-toastify';
import {Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/common/Header';
import Home from './components/Home/Home';
import Catalog from './components/catalog/Catalog';


class App extends Component {
  render() {
    return (
      <div className="App">
      <main className="content">
        <Header/>
        <ToastContainer/>
        <Route path='/' exact component={Home}/>
        <Route path='/catalog' exact component={Catalog}/>
        </main>
      </div>
    );
  }
}

export default App;
