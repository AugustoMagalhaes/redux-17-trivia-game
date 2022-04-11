import React from 'react';
import '../styles/NotFound.css';
import { CgSearchFound } from 'react-icons/cg';

export default class NotFound extends React.Component {
  render() {
    return (
      <section className="notFound">
        <div>
          <h1>
            Página não encontrada!

          </h1>
          <p>A página que você procura não está disponível!</p>
          <p>Verifique o endereço e tente novamente!</p>
          <span>
            <CgSearchFound />
          </span>
        </div>
      </section>
    );
  }
}
