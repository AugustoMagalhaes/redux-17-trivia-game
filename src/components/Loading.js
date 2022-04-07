import React, { Component } from 'react';
import './Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <section className="loader-wrapper" style={ { display: 'inline-block' } }>
        <section className="loader-container">
          <p className="loading">Carregando...</p>
          <section className="loader" />
        </section>
      </section>
    );
  }
}
