import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import GameIndex from '../pages/GameIndex';
import NotFound from '../pages/NotFound';

class Routes extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ GameIndex } />
        <Route component={ NotFound } />
      </Switch>

    );
  }
}

export default Routes;
