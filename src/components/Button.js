import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { testid, text, disabled, onClick } = this.props;

    return (
      <button
        type="button"
        data-testid={ testid }
        disabled={ disabled }
        onClick={ onClick }
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
  onClick: PropTypes.func.isRequired,
};
