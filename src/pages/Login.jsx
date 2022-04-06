import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { loginAction, tokenAction } from '../redux/actions';
import Input from '../components/Input';
import Button from '../components/Button';
import fetchPlayAPI from '../Services/fetchPlayAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginLocal: '',
      passwordLocal: '',
      disabled: true,
      modal: false,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.validateForm());
  }

  validateForm = () => {
    const { loginLocal, passwordLocal } = this.state;
    const boolDisabled = !(loginLocal && passwordLocal);
    this.setState({ disabled: boolDisabled });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { loginLocal, passwordLocal } = this.state;
    console.log('cheguei aqui');
    const { history, dispatch } = this.props;
    const data = await fetchPlayAPI(); const tokenId = data.token;
    dispatch(tokenAction({ token: tokenId }));
    dispatch(loginAction({ email: loginLocal, password: passwordLocal }));
    history.push('/game');
  }

  handleClick = () => this.setState((prev) => ({ modal: !prev.modal }));

  render() {
    const { loginLocal, passwordLocal, disabled, modal } = this.state;
    console.log(this.props);
    return (
      <main>
        <header>
          <h1>Login</h1>
        </header>
        <form onSubmit={ this.onSubmit }>
          <Input
            labelName="Nome: "
            id="login-name"
            testid="input-player-name"
            type="text"
            name="loginLocal"
            value={ loginLocal }
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
          />
          <Input
            labelName="Senha: "
            testid="input-gravatar-email"
            id="login-password"
            type="password"
            name="passwordLocal"
            value={ passwordLocal }
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
          />
          <Button
            type="submit"
            testid="btn-play"
            disabled={ disabled }
            onSubmit={ this.onSubmit }
            text="Play"
          />
        </form>
        <footer>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClick }
          >
            Configurações do jogo
          </button>
          {modal && <h1 data-testid="settings-title">Hello Modal!</h1>}
        </footer>
      </main>
    );
  }
}

const mapStateToProps = (token, { player }) => (token || player);

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
