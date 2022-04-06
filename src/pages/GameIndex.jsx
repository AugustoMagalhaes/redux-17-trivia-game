import React from 'react';
import { connect } from 'react-redux';

class GameIndex extends React.Component {
  render() {
    console.log(this.props);
    return (
      <header>
        <nav>
          Hello NAV
        </nav>
        <h1>GAMEINDEX</h1>
      </header>
    );
  }
}

const mapStateToProps = (token, { player }) => (token || player);

export default connect(mapStateToProps)(GameIndex);
