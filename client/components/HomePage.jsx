import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';

export default function Homepage() {
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
      <h1>Home Page</h1>
      <Link to="/signUp">
        <button name="signUp" type="button" onClick={handleClick}>Sign Up</button>
      </Link>
      <Link to="/logIn">
        <button name="logIn" type="button" onClick={handleClick}>Log In</button>
      </Link>
    </div>
  );
}
