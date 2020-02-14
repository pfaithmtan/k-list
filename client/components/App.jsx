import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import SignUp from './SignUp';
import Login from './Login';
import UserPage from './UserPage';
import SongList from './SongList';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/logIn" component={Login} />
        <Route path="/userPage" component={UserPage} />
        <Route path="/songList" component={SongList} />
      </Switch>
    </div>
  );
}
