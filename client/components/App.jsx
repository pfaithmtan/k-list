import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';

export default function App() {
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);

  const handleClick = (event) => {
    event.persist();

    const buttonName = event.target.name;

    if (buttonName === 'signUp') {
      setSignUp(true);
    } else if (buttonName === 'logIn') {
      setLogIn(true);
    }
  };

  return (
    <div>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/:id" component={Login} />
      </Switch>
      {/* <div>name of app goes here</div> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <button name="signUp" type="button" onClick={handleClick}>Sign Up</button> */}
      <button name="logIn" type="button" onClick={handleClick}>Log In</button>
    </div>
  );
}
