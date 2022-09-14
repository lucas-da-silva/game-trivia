import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

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
      return (<Redirect to="/settings" />);
    }
    return (
      <button
        className="is-ligth is-size-4 has-text-black
        has-text-weight-semibold p-1 is-rounded"
        data-testid="btn-settings"
        type="submit"
        onClick={ this.redirectToSettings }
      >
        ⚙
      </button>
    );
  }
}

export default ConfigurationButton;
