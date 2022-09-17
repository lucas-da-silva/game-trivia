import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Feedback.css';

const MINIMAL_ASSERTIONS = 3;

class Feedback extends Component {
  showMessageFeedback = () => {
    const { assertions } = this.props;
    if (assertions >= MINIMAL_ASSERTIONS) return 'MANDOU BEM!';
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
    const { score, assertions, gravatarImg } = this.props;
    let color = 'good';
    if (assertions < MINIMAL_ASSERTIONS) {
      color = 'bad';
    }
    return (
      <section className="feedback-container">
        <main className="feedback-content-container">
          <img
            className={ `feedback-avatar ${`${color}-img`}` }
            src={ gravatarImg }
            alt="Avatar"
          />
          <h3
            className={ `feedback-text ${color}` }
            data-testid="feedback-text"
          >
            {this.showMessageFeedback()}

          </h3>
          <p
            data-testid="feedback-total-question"
          >
            {
              assertions === 0 ? 'Você não acertou nenhum questão!'
                : `Você acertou 
                ${assertions} ${assertions === 1 ? 'questão' : 'questões'}!`
            }
          </p>
          <p
            data-testid="feedback-total-score"
          >
            {
              `Um total de ${score} ${score === 1 ? ' ponto' : ' pontos'}`
            }
          </p>
        </main>
        <div>
          <button
            type="button"
            className="button is-info feedback-button"
            data-testid="btn-ranking"
            onClick={ this.buttonPlayRanking }
          >
            VER RANKING
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            className="button is-success feedback-button"
            onClick={ this.buttonPlayAgain }
          >
            JOGAR NOVAMENTE
          </button>
        </div>
      </section>
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
