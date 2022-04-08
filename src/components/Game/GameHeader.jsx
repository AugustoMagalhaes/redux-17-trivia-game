import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
// import '../../styles/GameHeader.css';
import '../../styles/Game.css';

class GameHeader extends React.Component {
  render() {
    const { score, name, hashGravatar } = this.props;
    return (
      <header className="GameHeader">
        <span data-testid="header-score">
          {score}
          <p>SCORE</p>
        </span>
        <h2>Go Trivia</h2>

        <section>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hashGravatar}` }
            alt="gravatar"
          />
          <div className="containerPerfil">
            {' '}
            <h4>Hello,</h4>
            {' '}
            <span data-testid="header-player-name">
              {' '}
              {name}
            </span>
            {' '}
          </div>
        </section>

      </header>
    );
  }
}

const mapStateToProps = ({ player }) => (player);

GameHeader.propTypes = {
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  hashGravatar: propTypes.string.isRequired };

export default connect(mapStateToProps)(GameHeader);
