import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/ConfigurationButton.css';

class ConfigurationButton extends Component {
  state = {
    isRedirect: false,
  };

  redirectToSettings = (event) => {
    event.preventDefault();
    this.setState({ isRedirect: true });
  };

  render() {
    const { isRedirect } = this.state;
    if (isRedirect) {
      return (<Redirect to="/game-trivia/settings" />);
    }
    return (
      <button
        data-testid="btn-settings"
        type="submit"
        className="btn-setting fa-spin-hover"
        onClick={ this.redirectToSettings }
      >
        <FontAwesomeIcon className="icon-gear" icon={ faGear } />
      </button>
    );
  }
}

export default ConfigurationButton;
