import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { testid, text, disabled, onSubmit } = this.props;

    return (
      <button
        type="submit"
        data-testid={ testid }
        disabled={ disabled }
        onSubmit={ onSubmit }
      >
        {text}

      </button>
    );
  }
}

Button.propTypes = {
  testid: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
