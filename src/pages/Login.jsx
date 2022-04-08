import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { loginAction, tokenAction, timerAction } from '../redux/actions';
import Input from '../components/Input';
import Button from '../components/Button';
import { fetchPlayAPI } from '../services/api';
import '../styles/Login.css';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginLocal: '',
      nomeLocal: '',
      disabled: true,
      modal: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(timerAction(
      { show: false, timerActive: true, countdown: 30 },
    ));
  }

  // NOTE atualiza os estados da classe
  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => this.validateForm());
  }

  // NOTE Validação do formulário de login
  validateForm = () => {
    const { loginLocal, nomeLocal } = this.state;
    const boolDisabled = !(loginLocal && nomeLocal);
    this.setState({ disabled: boolDisabled });
  }

  // NOTE ação a ser executada quando o botão de submit em login é clicado
  onSubmit = async (e) => {
    e.preventDefault();
    const { loginLocal, nomeLocal } = this.state;
    const { history, dispatch } = this.props;
    this.setState({ loading: true });

    // NOTE recupera um token para o login do usuário
    const data = await fetchPlayAPI(); const tokenId = data.token;

    // NOTE dispara a ação de salvar o token como estado global
    dispatch(tokenAction({ token: tokenId }));

    // NOTE redireciona a página para o componente de game
    history.push('/game');

    const hashGravatar = md5(loginLocal).toString();
    dispatch(loginAction({
      gravatarEmail: loginLocal,
      name: nomeLocal,
      hashGravatar,
    }));
    this.setState({ loading: false });
  }

  // NOTE handler do clique no botão de configurações do jogo
  handleClick = () => this.setState((prev) => ({ modal: !prev.modal }));

  render() {
    const { loginLocal, nomeLocal, disabled, modal, loading } = this.state;
    return (
      <main className="Login">
        <header>
          <h1>Login</h1>
        </header>
        <form onSubmit={ this.onSubmit } autoComplete="off">
          <Input
            labelName="Nome"
            testid="input-player-name"
            id="login-name"
            type="text"
            name="nomeLocal"
            value={ nomeLocal }
            placeholder="Digite seu nome"
            onChange={ this.handleChange }
          />
          <Input
            labelName="Email"
            id="login-email"
            testid="input-gravatar-email"
            type="text"
            name="loginLocal"
            value={ loginLocal }
            placeholder="Digite seu email"
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
        {loading && <Loading />}
        <footer>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleClick }
          >
            Configurações
          </button>
          {modal && <h1 data-testid="settings-title">Hello Modal!</h1>}
        </footer>
      </main>
    );
  }
}

const mapStateToProps = (state) => (state);

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
