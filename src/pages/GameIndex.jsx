import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class GameIndex extends React.Component {
  render() {
    const { user: { player }, user } = this.props;
    console.log(user);
    return (
      <header>
        Hello,
        {' '}
        <span data-testid="header-player-name">{player.name}</span>
        <img data-testid="header-profile-picture" src={ player.picture } alt="gravatar" />
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (token, { user }) => (token || user);

GameIndex.propTypes = {
  user: propTypes.shape({
    player: propTypes.shape({ name: propTypes.string,
      picture: propTypes.string,
    }) }).isRequired,
};

export default connect(mapStateToProps)(GameIndex);
