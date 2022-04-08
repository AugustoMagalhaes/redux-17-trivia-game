/*

Os botões das alternativas devem ser elementos irmãos; ou seja,
não podem estar dentro de outra tag

O elemento com a alternativa correta deve possuir o atributo data-testid com o valor
correct-answer

Os elementos com as alternativas incorretas devem possuir o atributo data-testid
com o valor wrong-answer-${index}, com ${index} iniciando com o valor 0

As alternativas devem estar dentro de uma tag que possui o atributo data-testid com
o valor answer-options

As alternativas devem ser exibidas em ordem aleatória

Dica: utilize botões (<button/>) para as alternativas
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './QuestOption.css';

export default class QuestOption extends Component {
  render() {
    const { body, isRight, index, show, setShow, difficulty } = this.props;
    return (
      <button
        type="button"
        onClick={ setShow }
        disabled={ show }
        className={
          isRight
            ? `QuestOption right ${show && 'show'}`
            : `QuestOption nright ${show && 'show'}`
        }
        data-testid={
          isRight
            ? 'correct-answer'
            : `wrong-answer-${index}`
        }
        data-difficulty={ difficulty }
      >
        { body }
      </button>
    );
  }
}

QuestOption.propTypes = {
  isRight: PropTypes.bool,
  body: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
};
QuestOption.defaultProps = { isRight: false };
