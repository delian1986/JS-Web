import React from 'react';
import './App.css';
import rerender from './index.js'

let counter = 0
const incrementCounter = () => {
  counter++
  rerender(Counter(),document.getElementById('root'))
  console.log(counter)
}

const Counter = ()=>(
  < div className="App" >
    <header className="App-header">
      {counter}
    </header>
    <p className="App.intro">
      <button onClick={incrementCounter}>Increment</button>
    </p>
  </div >
)

export default Counter;
