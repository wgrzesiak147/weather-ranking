import React, {Component} from 'react';
import logo from './sun.png';
import './App.css';
import {Provider} from 'react-redux'
import MainPage from './components/MainPage'
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
            <h1 className="App-title">Weather ranking</h1>
          </header>
          <p className="App-intro">
            <MainPage></MainPage>
          </p>
        </div>
      </Provider>
    );
  }
}

export default App;
