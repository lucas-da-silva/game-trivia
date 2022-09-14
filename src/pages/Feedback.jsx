import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  showMessageFeedback = () => {
    const TRES = 3;
    const { assertions } = this.props;
    if (assertions >= TRES) return 'MANDOU BEM!';
    return 'PODIA SER MELHOR...';
  };

  buttonPlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  buttonPlayRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <main>
          <h3 data-testid="feedback-text">{this.showMessageFeedback()}</h3>
          <p
            data-testid="feedback-total-question"
          >
            {
              score === 0
                ? 'Você não acertou nenhum questão!' : `Você acertou ${score} questões!`
            }
          </p>
          <p
            data-testid="feedback-total-score"
          >
            {
              `Um total de ${assertions} ${assertions === 1 ? ' ponto' : ' pontos'}`
            }
          </p>
        </main>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.buttonPlayAgain }
        >
          JOGAR NOVAMENTE
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.buttonPlayRanking }
        >
          VER RANKING
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  score: number,
  assertions: number,
}.isRequired;

const mapStateToProps = ({ player }) => ({
  ...player,
});

export default connect(mapStateToProps)(Feedback);
