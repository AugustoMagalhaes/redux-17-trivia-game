import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../styles/GameHeader.css';

class GameHeader extends React.Component {
  render() {
    const { player } = this.props;
    return (
      <header className="GameHeader">
        <span data-testid="header-score">Score: 0</span>
        <h2>Trivia</h2>
        <section>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${player.hashGravatar}` }
            alt="gravatar"
          />
          <div className="containerPerfil">
            {' '}
            <h4>Hello, </h4>
            {' '}
            <span data-testid="header-player-name">
              {' '}
              {player.name}
            </span>
            {' '}
          </div>
        </section>

      </header>
    );
  }
}

const mapStateToProps = ({ user }) => (user);

GameHeader.propTypes = {
  player: propTypes.shape({ name: propTypes.string,
    hashGravatar: propTypes.string,
  }).isRequired,

};

export default connect(mapStateToProps)(GameHeader);
