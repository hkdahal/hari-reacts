import React, { Component } from 'react';
import TopicsScreen from './containers/TopicsScreen'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hari reacts!</h1>
        <TopicsScreen />
      </div>
    );
  }
}

export default App;
