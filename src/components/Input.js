import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Input.css';

export default class Input extends Component {
  render() {
    const { type,
      name, testid, labelName, id, value, placeholder, onChange } = this.props;
    return (
      <label htmlFor={ id } className="InputLabel">
        <input
          id={ id }
          type={ type }
          name={ name }
          data-testid={ testid }
          value={ value }
          placeholder={ placeholder }
          onChange={ onChange }
          className="InputLabel-input"
        />
        <p className="InputLabel-text">{labelName}</p>
      </label>

    );
  }
}
Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
