import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { configGame } from '../redux/actions';
import { categorys, difficultys, types } from '../services/config-dropdowns';
import '../styles/Settings.css';

class Settings extends Component {
  state = {
    category: '',
    difficult: '',
    type: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    dispatch(configGame(this.state));
    history.push('/trivia-game/game');
  };

  render() {
    const { category, difficult, type } = this.state;
    return (
      <section className="settings-container">
        <form className="form-settings-container" onSubmit={ this.handleSubmit }>
          <h1 className="title-setings" data-testid="settings-title">Configurações</h1>
          <div>
            <div className="select config-select">
              <select value={ category } onChange={ this.handleChange } name="category">
                {
                  categorys.map(({ id, name }) => (
                    <option key={ id } value={ id }>{name}</option>
                  ))
                }
              </select>
            </div>
            <div className="select config-select">
              <select value={ difficult } onChange={ this.handleChange } name="difficult">
                {
                  difficultys.map(({ id, name }) => (
                    <option key={ id } value={ id }>{name}</option>
                  ))
                }
              </select>
            </div>
            <div className="select config-select">
              <select value={ type } onChange={ this.handleChange } name="type">
                {
                  types.map(({ id, name }) => (
                    <option key={ id } value={ id }>{name}</option>
                  ))
                }
              </select>
            </div>
            <button
              className="button is-primary button-setting-play"
              type="submit"
            >
              Jogar
            </button>
          </div>
        </form>
      </section>
    );
  }
}

Settings.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Settings);
