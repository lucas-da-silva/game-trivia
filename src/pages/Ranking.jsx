import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/Ranking.css';

class Ranking extends Component {
  state = {
    isRedirect: false,
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  handleClick = () => {
    this.setState({ isRedirect: true });
  };

  render() {
    const { isRedirect, ranking } = this.state;
    const rankingSort = ranking.sort((a, b) => b.score - a.score);
    if (isRedirect) {
      return <Redirect to="/trivia-game/" />;
    }

    return (
      <section className="ranking-container">
        <div className="div-ranking-container">
          <h1 className="ranking-title" data-testid="ranking-title">Ranking</h1>
          <div>
            {
              rankingSort.map(({ name, score, gravatarImg }, index) => (
                <div className="player-ranking-container" key={ index }>
                  <div>
                    <img
                      className="ranking-avatar"
                      src={ gravatarImg }
                      alt="Avatar"
                    />
                    <p data-testid={ `player-name-${index}` }>{name}</p>
                  </div>
                  <div className="star-score-container">
                    <FontAwesomeIcon className="ranking-icon-star" icon={ faStar } />
                    <div>
                      <p
                        className="score-ranking"
                        data-testid={ `player-score-${index}` }
                      >
                        {score}
                      </p>
                      <p className="ponts-ranking">pontos</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <button
            onClick={ this.handleClick }
            type="button"
            className="button is-success button-play-again"
            data-testid="btn-go-home"
          >
            JOGAR NOVAMENTE
          </button>
        </div>
      </section>
    );
  }
}

export default Ranking;
