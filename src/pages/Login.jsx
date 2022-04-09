import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Tick, MTLModel, AmbientLight, DirectionLight } from 'react-3d-viewer';
import { loginAction, tokenAction, timerAction } from '../redux/actions';
import Input from '../components/Input';
import Button from '../components/Button';
import { fetchPlayAPI } from '../services/api';
import '../styles/Login.css';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.tick = '';
    this.state = {
      loginLocal: '',
      nomeLocal: '',
      disabled: true,
      modal: false,
      loading: false,
      modelRotation: { x: 0, y: 0, z: 0 },
      directionLightPosition: { x: 150, y: 50, z: -100 },
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(timerAction(
      { show: false, timerActive: true, countdown: 30 },
    ));

    this.tick = Tick(() => {
      const { modelRotation } = this.state;
      modelRotation.y += 0.005;
      this.setState({ modelRotation });
    });
    this.tick.animate = true;
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
    const {
      loginLocal,
      nomeLocal,
      disabled,
      modal,
      loading,
      modelRotation,
      directionLightPosition } = this.state;

    return (
      <main className="Login">
        <div className="Login-modelContainer">
          <MTLModel
            className="Login-MTLModel"
            width="500"
            height="500"
            enableZoom={ false }
            position={ { x: 0, y: 0, z: 0 } }
            rotation={ modelRotation }
            texPath="./lib/earth"
            mtl="./lib/earth/earth.mtl"
            src="./lib/earth/earth.obj"
            enabled={ false }
            scale={ { x: 1.2, y: 1.2, z: 1.2 } }
          >
            <DirectionLight color={ 0xffffff } position={ directionLightPosition } />
            <AmbientLight color={ 0xffffff } />
          </MTLModel>
          <blockquote id="bio" className="quote_bio">
            <p className="phrase phrase0">
              Dizem que o rei do Trivia será o rei do mundo
            </p>
            <p className="phrase phrase1">
              Mais desafiador do que comer manga com leite
            </p>
            <p className="phrase phrase2">
              Mais difícíl do que guardar uma fofoca
            </p>
          </blockquote>
        </div>

        <div className="Login-formContainer">
          <div className="Login-gameTitle">
            <span className="Login-gameTitleT">T</span>
            <span className="Login-gameTitleR">r</span>
            <span className="Login-gameTitleI">i</span>
            <span className="Login-gameTitleV">v</span>
            <span className="Login-gameTitleI">i</span>
            <span className="Login-gameTitleA">a</span>
          </div>
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
        </div>

        <ul className="Login-cubeBackground">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
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
