import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clock from '../components/Clock';
import Header from '../components/Header';
import { addToScoreAction } from '../redux/actions';
import apiQuestions from '../services/apiQuestions';
import '../styles/Game.css';

const INDEX_RANDOM = 0.5;
const LENGTH_QUESTIONS = 4;

class Game extends Component {
  state = {
    questions: [],
    indexQuestion: 0,
    answers: [],
    correctAnswer: '',
    resetTime: false,
    givenAnswer: false,
    timeIsExpired: false,
    currentCount: 30,
    score: 0,
  };

  componentDidMount() {
    this.getQuestions();
  }

  getQuestions = async () => {
    const { category, difficult, type } = this.props;
    const questions = await apiQuestions(category, difficult, type);
    if (questions === undefined || !questions.length) {
      localStorage.removeItem('token');
      const { history } = this.props;
      history.push('/trivia-game/');
    } else {
      const answers = [
        questions[0].correct_answer,
        ...questions[0].incorrect_answers,
      ];
      this.setState({
        questions,
        answers: this.shuffleArray(answers),
        correctAnswer: questions[0].correct_answer,
      });
    }
  };

  // https://teamtreehouse.com/community/return-mathrandom05
  shuffleArray = (answers) => answers.sort(() => Math.random() - INDEX_RANDOM);

  handleClick = (answer, correctAnswer, difficulty) => {
    const hard = 3;
    const medium = 2;
    const easy = 1;
    const { dispatch } = this.props;
    const { currentCount } = this.state;
    if (answer === correctAnswer) {
      const INITIAL_POINT = 10;
      switch (difficulty) {
      case 'hard':
        dispatch(addToScoreAction(INITIAL_POINT + currentCount * hard));
        this.setState({ score: INITIAL_POINT + currentCount * hard });
        break;
      case 'medium':
        dispatch(addToScoreAction(INITIAL_POINT + currentCount * medium));
        this.setState({ score: INITIAL_POINT + currentCount * medium });
        break;
      default:
        dispatch(addToScoreAction(INITIAL_POINT + currentCount * easy));
        this.setState({ score: INITIAL_POINT + currentCount * easy });
      }
    }
    this.setState({ timeIsExpired: true, givenAnswer: true });
  };

  changeColor = (isCorrect) => (
    isCorrect
      ? 'correctAnswer is-success is-outlined'
      : 'incorrectAnswer is-danger is-outlined'
  );

  updateClock = (currentCount) => {
    this.setState({ currentCount });
  };

  handleExpired = () => {
    this.setState({ timeIsExpired: true });
  };

  nextQuestion = () => {
    const { name, gravatarImg, score } = this.props;
    this.setState({ resetTime: true }, () => {
      const { indexQuestion, questions } = this.state;
      if (indexQuestion === LENGTH_QUESTIONS) {
        const userScore = {
          name,
          score,
          gravatarImg,
        };
        const rankings = JSON.parse(localStorage.getItem('ranking'));
        if (rankings) {
          localStorage.setItem(
            'ranking',
            JSON.stringify([...rankings, userScore]),
          );
        } else {
          localStorage.setItem('ranking', JSON.stringify([userScore]));
        }
        const { history } = this.props;
        return history.push('/trivia-game/feedback');
      }
      const currentIndex = indexQuestion + 1;
      const answers = [
        questions[currentIndex].correct_answer,
        ...questions[currentIndex].incorrect_answers,
      ];
      this.setState({
        givenAnswer: false,
        resetTime: false,
        indexQuestion: currentIndex,
        answers: this.shuffleArray(answers),
        correctAnswer: questions[currentIndex].correct_answer,
        timeIsExpired: false,
        score: 0,
      });
    });
  };

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  };

  render() {
    const {
      questions,
      answers,
      correctAnswer,
      indexQuestion,
      givenAnswer,
      timeIsExpired,
      resetTime,
      score,
    } = this.state;
    const question = questions[indexQuestion];
    return (
      <section className="game-container">
        <Header />
        {question && (
          <section className="game-content-container">
            <section className="game-question-container">
              <div className="question-category">
                <p
                  data-testid="question-category"
                  className={ question }
                >
                  {question.category}
                </p>
              </div>
              <div className="question-text">
                <p
                  data-testid="question-text"
                >
                  {this.decodeEntity(question.question)}
                </p>
              </div>
              <Clock
                updateClock={ this.updateClock }
                resetTime={ resetTime }
                isToStopClock={ timeIsExpired }
                handleExpired={ this.handleExpired }
              />
            </section>
            <div className="game-answer-container" data-testid="answer-options">
              <div className="answers-container">
                {answers.map((answer, index) => (
                  <button
                    type="button"
                    key={ answer }
                    className={ `button is-rounded button-answer
                  ${
                  givenAnswer
                    ? this.changeColor(answer === correctAnswer)
                    : undefined}` }
                    data-testid={
                      answer === correctAnswer
                        ? 'correct-answer'
                        : `wrong-answer-${index}`
                    }
                    onClick={
                      () => this.handleClick(answer, correctAnswer, question.difficulty)
                    }
                    disabled={ timeIsExpired }
                  >
                    {this.decodeEntity(answer)}
                  </button>
                ))}
              </div>
              {
                score !== 0
                && <p className="text-score">{`Você ganhou ${score} pontos`}</p>
              }
              {(givenAnswer || timeIsExpired) && (
                <button
                  className="button game-button-next is-primary"
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextQuestion }
                >
                  {
                    indexQuestion === LENGTH_QUESTIONS ? 'Finalizar o jogo' : 'Próxima'
                  }
                </button>
              )}
            </div>
          </section>
        )}
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  name: PropTypes.string,
  gravatarImg: PropTypes.string,
  score: PropTypes.number,
  category: PropTypes.string,
  difficult: PropTypes.string,
  type: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ player, game }) => ({
  ...player,
  difficult: game.difficult,
  category: game.category,
  type: game.type,
});

export default connect(mapStateToProps)(Game);
