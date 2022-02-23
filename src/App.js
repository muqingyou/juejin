import React, { Component } from 'react';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import './App.css';
import {Route,Switch,Redirect} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path='/article' component={ArticlePage}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </div>
    )
  }
}
