import React from 'react';
import { connect } from 'react-redux';
import GameHeader from '../components/Game/GameHeader';
import GameBody from '../components/Game/GameBody';
import '../styles/Game.css';

class Game extends React.Component {
  render() {
    return (
      <div className="Game">
        <GameHeader />
        <GameBody />
      </div>
    );
  }
}

export default connect()(Game);
