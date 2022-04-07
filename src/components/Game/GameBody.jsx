import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { withRouter } from 'react-router-dom';
import Loading from '../Loading';
import { fetchQuestionAPI } from '../../services/api';
import QuestOption from './QuestOption';
import TimerRedux from '../TimerRedux';
import { timerAction } from '../../redux/actions/index';
import '../../styles/GameBody.css';
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
      dispatch(timerAction({ timerActive: true, resetTimer: true, show: false }));
    } else {
      dispatch(timerAction({ timerActive: false }));
      console.log('elseNextQuestion');
    }
  }

  setShow = () => {
    const { dispatch, show } = this.props;
    dispatch(timerAction({ show: !show, timerActive: false }));
  }

  feedback = () => {
    const { history } = this.props;
    history.push('feedback');
  }

  render() {
    const { loading, questionPosition, questionsReduce } = this.state;
    const { timer: { timerActive, show } } = this.props;
    return (
      <main className="GameBody">
        <section className="sectionPrymary">
          <h2>Game Go</h2>
          <br />
          { loading
            ? <Loading />
            : (
              <section key={ uuidv4() } id="answer-options" className="sectionSecond">
                <span>
                  {questionPosition + 1}
                  /
                  {questionsReduce.length}
                  {' '}
                  Pergunta
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
                <div data-testid="answer-options">
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
                    />
                  ))}
                </div>
              </section>
            )}
          <div className="buttonTime">
            {timerActive && <TimerRedux />}

            <button
              data-testid="btn-next"
              type="button"
              style={ { display: show ? 'block' : 'none' } }
              onClick={ this.nextQuestion }
            >
              Next
            </button>

            <button
              type="button"
              onClick={ this.feedback }
            >
              Feedback

            </button>
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
  }),
  history: propTypes.shape({ push: propTypes.func }).isRequired,
  dispatch: propTypes.func.isRequired,
};

GameBody.defaultProps = {
  timer: {},
  show: false,
};

export default withRouter(connect(mapStateToProps)(GameBody));
