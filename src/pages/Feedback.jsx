import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class Feedback extends Component {
  //

  componentDidMount() {
    this.generateLocalStorage();
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  routeToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  generateLocalStorage = () => {
    const { name, score, hashGravatar } = this.props;
    const storage = localStorage.getItem('ranking');
    console.log('parse antes ', JSON.parse(storage));
    console.log('name ', name);
    const checkPlayer = storage && JSON.parse(storage)
      .some((element) => element.name === name);
    console.log('check ', checkPlayer);
    if (!checkPlayer) {
      const picture = `https://www.gravatar.com/avatar/${hashGravatar}`;
      const rankingObj = {
        name,
        score,
        picture,
      };
      const parsedStoragezin = storage && JSON.parse(storage);
      const rankingList = parsedStoragezin
        ? [...parsedStoragezin, rankingObj] : [rankingObj];
      const stringifiedRanking = JSON.stringify(rankingList);
      console.log('rankingList ', stringifiedRanking);
      localStorage.setItem('ranking', stringifiedRanking);
    } else {
      const getStorage = localStorage.getItem('ranking');
      const oldStorage = JSON.parse(getStorage);
      const findPlayer = name && oldStorage?.find((element) => element.name === name);
      console.log('name', name);
      console.log('oldS ', oldStorage);
      console.log('findPlayer ', findPlayer);
      findPlayer.score += score;
      console.log('olS dps', oldStorage);
      const stringifiedNewRanking = JSON.stringify(oldStorage);
      localStorage.setItem('ranking', stringifiedNewRanking);
    }
  }

  render() {
    const { hashGravatar, name, score } = this.props;
    const profileImgSrc = `https://www.gravatar.com/avatar/${hashGravatar}`;
    const standardComparisor = 3;
    const dataFromStorage = localStorage.getItem('teste');
    const parsedData = JSON.parse(dataFromStorage);
    // precisa implementar a logica do localStorage ainda...Component
    // a ideia eh ser uma chave "x: {finalScore: number, finalAssertions: number}"
    console.log('parsed ', parsedData);
    return (
      <>
        <header>
          <h1>Feedback</h1>
          <h4 data-testid="header-player-name">
            {name}
            &apos;s Profile
            {/* Aqui talvez tenha que separar os textos caso o data-testid
           reclame que não tem so o 'name' */}
          </h4>
          <img
            src={ profileImgSrc }
            alt={ `${name}'s profile` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-score">
            Placar Atual:
            { ' ' /* ' Talvez tenha que tirar o "Placar" do "p" ' */}
            {score}
          </p>
          <p data-testid="feedback-text">
            {
              score >= standardComparisor ? 'Well Done!' : 'Could be better...'
            }
          </p>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ this.playAgain }
          >
            Jogar novamente

          </button>
        </header>
        <main>
          <h4>Informações finais</h4>
          <section>
            <section>
              Placar final:
              <p data-testid="feedback-total-score">{parsedData?.finalScore}</p>
            </section>
            <section>
              Número de perguntas respondidas:
              <p data-testid="feedback-total-question">{parsedData?.finalAssertions}</p>
            </section>
            <button
              type="button"
              onClick={ this.routeToRanking }
              data-testid="btn-ranking"
            >
              Ranking

            </button>
          </section>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  hashGravatar: state.user.player.hashGravatar,
  name: state.user.player.name,
  score: state.user.player.score,
});

Feedback.propTypes = {
  hashGravatar: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
};

export default withRouter(connect(mapStateToProps)(Feedback));

/*
{
  user: {
    player: {
      name: '',
      assertions: '',
      score: 0,
      gravatarEmail: '',
      hashGravatar: ''
    },
    ranking: [
      {
        name: '',
        score: 0,
        picture: ''
      }
    ]
  },
  token: '',
  timer: {
    timerActive: true,
    resetTimer: false,
    timerID: 0
  }
} */
