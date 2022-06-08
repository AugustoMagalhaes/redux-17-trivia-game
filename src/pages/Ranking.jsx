import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import '../styles/Ranking.css';

class Ranking extends Component {
  routeToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const getRanking = localStorage.getItem('ranking');
    const parsedRanking = JSON.parse(getRanking);
    const sortedList = parsedRanking.sort((a, b) => b.score !== a.score
     && b.score - a.score);
    return (
      <>
        <header>
          <h1
            data-testid="ranking-title"
            className="ranking-title"
          >
            Ranking
          </h1>
        </header>
        <main>

          {
            sortedList.map((item, index) => (
              <section key={ uuidv4() } className="info-container">

                <p
                  data-testid={ `player-name-${index}` }
                  className="player-name"
                >
                  {item.name}
                </p>
                <p
                  data-testid={ `player-score-${index}` }
                  className="player-score"
                >
                  {item.score}
                </p>
                <img
                  src={ item.picture }
                  alt={ `Foto de ${item.name}` }
                  className="player-img"
                />

              </section>
            ))
          }

          <button
            type="button"
            onClick={ this.routeToLogin }
            data-testid="btn-go-home"
            className="go-home"
          >
            Voltar à pagina inicial

          </button>
        </main>
      </>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default withRouter(connect(null, null)(Ranking));
