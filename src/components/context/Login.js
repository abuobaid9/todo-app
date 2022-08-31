import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import superAgent from "superagent";

import jwt from 'jsonwebtoken';
import base64 from 'base-64';
export const LoginContext = React.createContext();
const API = `https://hiservice.herokuapp.com`;
export default function Login(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({

    username: cookie.load('username') || "",
    actions: cookie.load('actions') || []
  });
  useEffect(() => {
    const tokenFromCookies = cookie.load('token');
    if (tokenFromCookies) {
      setLoggedIn(true);
      setUser(user);
    } else {
      setLoggedIn(false);
      setUser({})
    }
    // eslint-disable-next-line
  }, []);
  const can = (action) => {
    return user?.actions?.includes(action)
  }
  const login = async (username, password) => {
    const response = await superAgent.post(`${API}/users/login`).set('authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
    console.log(response.body)
    validateMyUser(response.body)
  }
  const validateMyUser = (user) => {
    if (user.token) {
      const userFromToken = jwt.decode(user.token);
      console.log('username >>>> ', userFromToken);
      setLoggedIn(true);
      setUser(user);
      cookie.save('token', user.token);
      cookie.save('username', user.username);
      cookie.save('actions', user.actions);
      console.log({ loggedIn });
    } else {
      setLoggedIn(false);
      setUser({});
    }
  }
  const logout = () => {
    setLoggedIn(false);
    setUser({});
    cookie.remove('token');
    cookie.remove('actions');
    cookie.remove('username');
  }
  const state = {
    loggedIn: loggedIn,
    user: user,
    can: can,
    login: login,
    logout: logout
  }
  return (
    <>
      <LoginContext.Provider value={state}>
        {props.children}
      </LoginContext.Provider>
    </>
  )
}