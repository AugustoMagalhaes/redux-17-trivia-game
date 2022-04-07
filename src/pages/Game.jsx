import React from 'react';
import { connect } from 'react-redux';
import GameHeader from '../components/Game/GameHeader';
import GameBody from '../components/Game/GameBody';

class Game extends React.Component {
  render() {
    return (
      <div>
        <GameHeader />
        <GameBody />
      </div>
    );
  }
}

export default connect()(Game);
