import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux'
import WeatherRanking from './Components/WeatherRanking'

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            <WeatherRanking></WeatherRanking>
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
