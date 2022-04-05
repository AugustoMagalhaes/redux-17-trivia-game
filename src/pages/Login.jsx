import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.validateForm());
  }

  validateForm = () => {
    const { login, password } = this.state;
    const boolDisabled = !(login && password);
    this.setState({ disabled: boolDisabled });
  }

  onSubmit = () => console.log('agora vai despachar o evento');

  render() {
    const { login, password, disabled } = this.state;

    return (
      <section>
        <header>
          <h1>Login</h1>
        </header>
        <form onSubmit={ this.onSubmit }>
          <Input
            labelName="Nome: "
            id="login-name"
            type="text"
            name="login"
            testid="input-player-name"
            value={ login }
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
          />
          <Input
            labelName="Senha: "
            testid="input-gravatar-email"
            id="login-password"
            type="password"
            name="password"
            value={ password }
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
          />
          <Button
            type="button"
            testid="btn-play"
            disabled={ disabled }
            onClick={ () => { console.log('clicou'); } }
            text="Play"
          />
        </form>
      </section>
    );
  }
}
