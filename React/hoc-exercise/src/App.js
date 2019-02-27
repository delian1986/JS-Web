import React, { Component } from 'react';
import './App.css';
import Article from './components/Article/Article';
import Navigation from './components/Navigation/Navigation';
import RegisterForm from './components/RegisterForm/RegisterForm';
import warningWrapper from './hocs/warningWrapper';
import errorHandlingWrapper from './hocs/errorHandlingWrapper';
import BindingForm from './components/BindingForm/BindingForm';

const ArticleWithWarning=errorHandlingWrapper(warningWrapper(Article))

class App extends Component {
  onSubmit(e,data){
    e.preventDefault()
    console.log(data);
  }
  render() {
    return (
      <section className="App">
        <Navigation/>
        <BindingForm onSubmit={this.onSubmit}>
          <input type="text" name="username" placeholder="username"/>
          <input type="password" name="password" placeholder="password"/>
        </BindingForm>
        <ArticleWithWarning/>
        <RegisterForm/>
      </section>
    );
  }
}

export default App;
