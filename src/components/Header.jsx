import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import apiGravatar from '../services/apiGravatar';
import ConfigurationButton from './ConfigurationButton';

class Header extends Component {
  render() {
    const { name, score, img } = this.props;
    return (
      <header
        className="control has-background-grey-lighter has-text-black box p-2
      is-primary is-max-desktop is-flex
      is-justify-content-space-around is-align-items-center"
      >
        <section className="is-flex">
          <figure className="image is-122x122">
            <img
              className="is-rounded"
              data-testid="header-profile-picture"
              src={ img }
              alt="Avatar"
            />
          </figure>
          <figure className="image is-125x125">
            <img src="https://www.svgrepo.com/show/414246/ask.svg" alt="logo" />
          </figure>
        </section>
        <section
          className="is-flex is-justify-content-space-between is-align-items-center"
        >
          <p className="mx-2" data-testid="header-player-name">
            {`Player: ${name}`}
          </p>
          <span className="mx-2" data-testid="header-score">
            {`Pontos: ${score}`}
          </span>
          <ConfigurationButton />
        </section>
      </header>
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
