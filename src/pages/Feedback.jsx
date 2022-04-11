import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import GameHeader from '../components/Game/GameHeader';
import { loginAction } from '../redux/actions';
import '../styles/Feedback.css';

class Feedback extends Component {
  constructor() {
    super();
    this.state = { hasCalled: false };
  }

  playAgain = () => {
    const { history, player, dispatch } = this.props;
    player.score = 0;
    dispatch(loginAction(player));
    history.push('/');
  }

  routeToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  appendPlayer = () => {
    const storage = localStorage.getItem('ranking');
    const parsedStorage = storage && JSON.parse(storage);
    const playerObj = this.createPlayer();
    const rankingList = [...parsedStorage, playerObj];
    const stringifiedRanking = JSON.stringify(rankingList);
    localStorage.setItem('ranking', stringifiedRanking);
  }

  handleStorage = () => {
    const { name } = this.props;
    const storage = localStorage.getItem('ranking');
    if (!storage) {
      const newPlayer = this.createPlayer();
      const rankingListFirstPlayer = [newPlayer];
      const stringifiedPlayer = JSON.stringify(rankingListFirstPlayer);
      localStorage.setItem('ranking', stringifiedPlayer);
    } else {
      const testeStorage = localStorage.getItem('ranking');
      const parsedRanking = JSON.parse(testeStorage);
      const checkPlayer = parsedRanking
      && parsedRanking.some((element) => element.name === name);
      if (checkPlayer) {
        this.incrementScore();
      } else {
        this.appendPlayer();
      }
    }
  }

  incrementScore = () => {
    const { name, score } = this.props;
    const storage = localStorage.getItem('ranking');
    const oldStorage = JSON.parse(storage);
    const findPlayer = name && oldStorage?.find((element) => element.name === name);

    findPlayer.score += score;
    const stringifiedNewRanking = JSON.stringify(oldStorage);
    localStorage.setItem('ranking', stringifiedNewRanking);
  }

  createFinalInfo = () => {
    const { name, score, assertions } = this.props;
    return {
      [name]: {
        score,
        assertions,
      },
    };
  }

  handleFinal = () => {
    const { name, assertions: newAssertions, score: newScore } = this.props;
    const final = localStorage.getItem('finalInfo');
    if (!final) {
      const infoArray = [this.createFinalInfo()];
      const newInfo = JSON.stringify(infoArray);
      localStorage.setItem('finalInfo', newInfo);
    } else {
      const parsedFinal = JSON.parse(final);
      const findPlayerFinal = parsedFinal.find((element) => element[name]);
      if (findPlayerFinal) {
        // gambiarra
        findPlayerFinal[name].score = 0;
        findPlayerFinal[name].assertions = 0; // end gambiarra

        findPlayerFinal[name].score += newScore;
        findPlayerFinal[name].assertions += newAssertions;

        const stringifiedFinal = JSON.stringify(parsedFinal);
        localStorage.setItem('finalInfo', stringifiedFinal);
      } else {
        const appendPlayerFinal = this.createFinalInfo();
        const finalList = [...parsedFinal, appendPlayerFinal];
        const stringifiedFinal = JSON.stringify(finalList);
        localStorage.setItem('finalInfo', stringifiedFinal);
      }
      this.setState({ hasCalled: true });
    }
  }

  createPlayer() {
    const { name, score, hashGravatar } = this.props;
    const picture = `https://www.gravatar.com/avatar/${hashGravatar}`;
    return {
      name,
      score,
      picture,
    };
  }

  render() {
    const { hashGravatar, name, score, assertions } = this.props;
    const { hasCalled } = this.state;
    if (!hasCalled) {
      this.handleStorage();
      this.handleFinal();
    }
    const profileImgSrc = `https://www.gravatar.com/avatar/${hashGravatar}`;
    const standardComparisor = 3;
    const dataFromStorage = localStorage.getItem('finalInfo');
    const parsedData = dataFromStorage && JSON.parse(dataFromStorage);
    const userRanking = parsedData && parsedData.find((element) => element[name]);

    return (
      <main className="mainFeedBack">
        <GameHeader />
        <header className="headerFeedBack">
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
            {' '}
            {score}
          </p>
          <p data-testid="feedback-text">
            {
              assertions >= standardComparisor ? 'Well Done!' : 'Could be better...'
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
        <section className="sectionFeedBack">
          <h4>Informações finais</h4>
          <section className="sectionSecunFeedBack">
            Placar final:
            {
              parsedData
                ? <p data-testid="feedback-total-score">{userRanking[name]?.score}</p>
                : <p> Favor voltar a tela de login </p>
            }

          </section>
          <section className="sectionNumbers">
            Número de perguntas respondidas:
            {
              parsedData
                ? (
                  <p
                    data-testid="feedback-total-question"
                  >
                    {userRanking[name]?.assertions}
                  </p>)
                : <p> Favor voltar a tela de login </p>
            }

          </section>
          <button
            className="buttonFeedBack"
            type="button"
            onClick={ this.routeToRanking }
            data-testid="btn-ranking"
          >
            Ranking....

          </button>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  hashGravatar: state.player.hashGravatar,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
  player: state.player,
});

Feedback.propTypes = {
  assertions: propTypes.number.isRequired,
  hashGravatar: propTypes.string,
  name: propTypes.string,
  score: propTypes.number,
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  player: propTypes.shape({
    score: propTypes.number,
    assertions: propTypes.number,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

Feedback.defaultProps = {
  hashGravatar: '',
  name: 'Por favor, volte a pagina inicial e faça o login',
  score: 0,
};

export default withRouter(connect(mapStateToProps)(Feedback));
