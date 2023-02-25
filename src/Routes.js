import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/game-trivia/game"
          render={ (props) => <Game { ...props } /> }
        />
        <Route
          exact
          path="/game-trivia/settings"
          render={ (props) => <Settings { ...props } /> }
        />
        <Route
          exact
          path="/game-trivia/ranking"
          component={ Ranking }
        />
        <Route
          exact
          path="/game-trivia/feedback"
          component={ Feedback }
        />
        <Route
          exact
          path="/game-trivia/"
          render={ (props) => <Login { ...props } /> }
        />
      </Switch>
    );
  }
}

export default Routes;
