import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

class Ranking extends Component {
  routeToLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const Alberto = { name: 'Alberto',
      score: 20,
      picture: 'https://tinyurl.com/8asduadad',
    };
    const Claudia = { name: 'Carla',
      score: 40,
      picture: 'https://tinyurl.com/testzz0z0z2' };
    // na pratica vai ser x = JSON.parse(localStorage.getItem('ranking')) \/
    // precisa criar o localStorage
    const listaPraTestar = [Alberto, Claudia];
    // pra ordenar a array por classificaçao no score
    const sortedList = listaPraTestar.sort((a, b) => b.score - a.score);
    console.log('sortedL ', sortedList);
    return (
      <>
        <header>
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <main>

          {
            sortedList.map((item, index) => (
              <section key={ uuidv4() }>
                <ul>
                  <li data-testid={ `player-name-${index}` }>{item.name}</li>
                  <li data-testid={ `player-score-${index}` }>{item.score}</li>
                  <li>
                    <img src={ item.picture } alt={ `Foto de ${item.name}` } />
                    {' '}
                  </li>
                </ul>
              </section>
            ))
          }

          <button
            type="button"
            onClick={ this.routeToLogin }
            data-testid="btn-go-home"
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
