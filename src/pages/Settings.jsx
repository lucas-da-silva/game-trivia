import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { configGame } from '../redux/actions';
import { categorys, difficultys, types } from '../services/config-dropdowns';

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
    history.push('/game');
  };

  render() {
    const { category, difficult, type } = this.state;
    return (
      <section>
        <h1 data-testid="settings-title">Configurações</h1>
        <form onSubmit={ this.handleSubmit }>
          <select value={ category } onChange={ this.handleChange } name="category">
            {
              categorys.map(({ id, name }) => (
                <option key={ id } value={ id }>{name}</option>
              ))
            }
          </select>
          <select value={ difficult } onChange={ this.handleChange } name="difficult">
            {
              difficultys.map(({ id, name }) => (
                <option key={ id } value={ id }>{name}</option>
              ))
            }
          </select>
          <select value={ type } onChange={ this.handleChange } name="type">
            {
              types.map(({ id, name }) => (
                <option key={ id } value={ id }>{name}</option>
              ))
            }
          </select>
          <button type="submit">Jogar</button>
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
