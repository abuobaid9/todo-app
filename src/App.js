import React, { Component } from 'react'

import ToDo from './components/todo/todo';
import Navbar from './components/navBar/NavBar';
import SettingsContextProvider from './components/context/Settings';
import Login from './components/context/Login';
import LoginForm from './components/LoginForm/loginForm'
import './App.css';


export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Login>
          <Navbar />
          <LoginForm />
          <SettingsContextProvider>
            <ToDo />
          </SettingsContextProvider>
        </Login>
      </div>
    )
  }
}