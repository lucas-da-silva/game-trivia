import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import apiGravatar from '../services/apiGravatar';
import ConfigurationButton from './ConfigurationButton';

class Header extends Component {
  render() {
    const { name, score, img } = this.props;
    return (
      <div>
        <img data-testid="header-profile-picture" src={ img } alt="Avatar" />
        <p data-testid="header-player-name">{ name }</p>
        <span data-testid="header-score">{ score }</span>
        <ConfigurationButton />
      </div>
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
