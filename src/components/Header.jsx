import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Header.css';
import ConfigurationButton from './ConfigurationButton';

class Header extends Component {
  render() {
    const { name, score, img } = this.props;
    return (
      <section className="header-container">
        <img src="https://www.svgrepo.com/show/414246/ask.svg" alt="logo" />
        <div className="header-content-container">
          <div className="header-profile-container">
            <img
              data-testid="header-profile-picture"
              className="header-profile-img"
              src={ img }
              alt="Avatar"
            />
            <p data-testid="header-player-name">{name}</p>
          </div>
          <div className="header-score-container">
            <FontAwesomeIcon className="header-icon-star" icon={ faStar } />
            <p>Pontos:</p>
            <span data-testid="header-score">
              <b>{score}</b>
            </span>
          </div>
          <ConfigurationButton />
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  img: state.player.gravatarImg,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
