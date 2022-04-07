import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Game from '../pages/Game';
import NotFound from '../pages/NotFound';
import Feedback from '../pages/Feedback';
import Ranking from '../pages/Ranking';

class Routes extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route component={ NotFound } />
      </Switch>

    );
  }
}

export default Routes;
