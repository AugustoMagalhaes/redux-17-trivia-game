import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../Loading';
import { fetchQuestionAPI } from '../../services/api';
import QuestOption from './QuestOption';
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

  nextQuestion = () => {
    const { maxPosition, questionPosition } = this.state;
    if (questionPosition < maxPosition) {
      this.setState((prev) => (
        { questionPosition: prev.questionPosition + 1 }));
    } else {
      this.setState({ questionPosition: 0 });
    }
  }

  render() {
    const { loading, questionPosition, questionsReduce } = this.state;
    console.log(questionsReduce);

    return (
      <header className="GameBody">
        <h2>Hello GameBody</h2>
        <br />
        { loading
          ? <Loading />
          : (
            <section key={ uuidv4() } id="answer-options">
              <p>
                Pergunta:
                {' '}
                {questionPosition + 1}
                /
                {questionsReduce.length}
              </p>
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
              <p data-testid="question-text">
                Question:
                {' '}
                {questionsReduce[questionPosition]?.question}
              </p>
              <p data-testid="answer-options">
                Answers:
                {' '}
                {questionsReduce[questionPosition]?.answers.map((e, i) => (
                  <QuestOption
                    key={ uuidv4() }
                    body={ e }
                    isRight={ e === questionsReduce[questionPosition]?.correct_answer }
                    index={ i }
                  />
                ))}
              </p>
              <button type="button" onClick={ this.nextQuestion }>Next</button>
            </section>
          )}
      </header>
    );
  }
}

const mapStateToProps = (state) => (state);

GameBody.propTypes = {
  token: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(GameBody);
