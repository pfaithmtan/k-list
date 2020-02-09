import React, { Component } from 'react';
import SignUp from './SignUp';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUp: false,
      logIn: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.persist();

    const buttonName = event.target.name;

    this.setState({
      [buttonName]: true,
    });
  }

  render() {
    return (
      <div>
        {/* <div>name of app goes here</div> */}
        {/* <Login /> */}
        <SignUp />
        {/* <button name="signUp" type="button" onClick={this.handleClick}>Sign Up</button> */}
        {/* <button name="logIn" type="button" onClick={this.handleClick}>Log In</button> */}
      </div>
    );
  }
}

export default App;
