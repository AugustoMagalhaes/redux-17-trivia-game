import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading';
import { fetchQuestionAPI } from '../../services/api';
import QuestOption from './QuestOption';
import TimerRedux from '../TimerRedux';
import { timerAction, scoreAction } from '../../redux/actions/index';
import '../../styles/Game.css';
// GRUPO 10 É O MELHOR
class GameBody extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      questions: [],
      questionsReduce: [],
      questionPosition: 0,
      maxPosition: 4,
    };
  }

  async componentDidMount() {
    const { token } = this.props;
    const BUBBLE = 0.5;
    const result = await fetchQuestionAPI(token);
    this.setState({ loading: false, questions: result.results }, () => {
      const { questions } = this.state;
      const questionReduce = questions.reduce((acc, e) => {
        const bubbleAnswers = [...e.incorrect_answers, e.correct_answer]
          .sort(() => Math.random() - BUBBLE);
        acc = [...acc, { ...e, answers: bubbleAnswers }];
        return acc;
      }, []);
      this.setState({ questionsReduce: questionReduce });
      console.log(questionReduce);
    });
  }

  componentWillUnmount() {
    const { timer: { timerID } } = this.props;
    clearInterval(timerID);
  }

  nextQuestion = () => {
    const { maxPosition, questionPosition } = this.state;
    const { dispatch } = this.props;
    if (questionPosition < maxPosition) {
      this.setState((prev) => (
        { questionPosition: prev.questionPosition + 1 }));
      dispatch(timerAction({ timerActive: true, countdown: 30, show: false }));
    } else {
      dispatch(timerAction({ timerActive: false }));
      console.log('elseNextQuestion');
    }
  }

  setShow = ({ target: { dataset: { testid, difficulty } } }) => {
    const {
      player: { score, assertions }, dispatch, show, timer: { timerID, countdown },
    } = this.props;
    const TEN = 10;
    const THREE = 3;
    if (testid === 'correct-answer') {
      if (difficulty === 'easy') {
        dispatch(scoreAction({
          score: score + TEN + (countdown), assertions: assertions + 1 }));
      }
      if (difficulty === 'medium') {
        dispatch(scoreAction({
          score: score + TEN + (countdown * 2), assertions: assertions + 1 }));
      }
      if (difficulty === 'hard') {
        dispatch(scoreAction({
          score: score + TEN + (countdown * THREE), assertions: assertions + 1 }));
      }
    }
    clearInterval(timerID);
    dispatch(timerAction({ show: !show, timerActive: false, countdown: 30 }));
  }

  feedback = () => {
    const { history } = this.props;
    history.push('feedback');
  }

  render() {
    const { loading, questionPosition, questionsReduce } = this.state;
    const { timer: { timerActive, show } } = this.props;
    // console.log(questionsReduce);
    return (
      <main className="GameBody">
        <section className="sectionPrymary">
          <div>
            <h2>Game Go</h2>
          </div>
          { loading
            ? <Loading />
            : (
              <section key={ uuidv4() } id="answer-options" className="sectionSecond">
                <span>
                  {questionPosition + 1}
                  /
                  {questionsReduce.length}
                  {' '}
                  Question
                </span>
                <p data-testid="question-category">
                  Category:
                  {' '}
                  {questionsReduce[questionPosition]?.category}
                </p>
                <p>
                  Difficulty:
                  {' '}
                  {questionsReduce[questionPosition]?.difficulty}
                </p>
                <aside data-testid="question-text">
                  Question:
                  {' '}
                  {questionsReduce[questionPosition]?.question}
                </aside>
                <div
                  data-testid="answer-options"
                  className="questOptions"
                >
                  Answers:
                  {' '}
                  {questionsReduce[questionPosition]?.answers.map((e, i) => (
                    <QuestOption
                      key={ uuidv4() }
                      body={ e }
                      isRight={ e === questionsReduce[questionPosition]?.correct_answer }
                      index={ i }
                      show={ show }
                      setShow={ this.setShow }
                      difficulty={ questionsReduce[questionPosition]?.difficulty }
                    />
                  ))}
                </div>
              </section>
            )}
          <div className="buttonTime">
            {timerActive && <TimerRedux />}

            {questionPosition + 1 < questionsReduce.length
              ? (
                <button
                  data-testid="btn-next"
                  type="button"
                  style={ { display: show ? 'block' : 'none' } }
                  onClick={ this.nextQuestion }
                >
                  Next
                </button>
              )
              : (
                <button
                  data-testid="btn-next"
                  type="button"
                  style={ { display: show ? 'block' : 'none' } }
                  onClick={ this.feedback }
                >
                  Results
                </button>
              )}
          </div>
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => (state);

GameBody.propTypes = {
  token: propTypes.string.isRequired,
  show: propTypes.bool,
  timer: propTypes.shape({
    timerID: propTypes.number,
    timerActive: propTypes.bool,
    show: propTypes.bool,
    countdown: propTypes.number,
  }),
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  dispatch: propTypes.func.isRequired,
  player: propTypes.shape({
    score: propTypes.number,
    assertions: propTypes.number,
  }).isRequired,
};

GameBody.defaultProps = {
  timer: {},
  show: false,
};

export default withRouter(connect(mapStateToProps)(GameBody));
