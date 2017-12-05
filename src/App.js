import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux'
import WeatherRanking from './components/WeatherRanking'
import {createStore, applyMiddleware} from 'redux'
import weatherRanking from './reducers/'
import {defaultState} from './defaultState'
import thunkMiddleware from 'redux-thunk'

let store = createStore(weatherRanking, defaultState, applyMiddleware(thunkMiddleware))

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
