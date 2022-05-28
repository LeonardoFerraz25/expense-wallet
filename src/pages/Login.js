import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userEmail } from '../actions';
import '../css/Login.css';
import carteira from '../imagens/wallet.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      const { email, password } = this.state;
      const MIN_LENGTH = 6;
      const emailCheck = email
        .split('').includes('@') && email.split('.').includes('com');
      const passwordCheck = password.length >= MIN_LENGTH;
      if (emailCheck && passwordCheck) {
        this.setState({ isButtonDisabled: false });
      } else {
        this.setState({ isButtonDisabled: true });
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { setUserEmail, history } = this.props;

    setUserEmail(email);
    history.push('/carteira');
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div className="main-login">
        <form className="form-login" onSubmit={ this.handleSubmit }>
          <div className="wallet-wrapper">
            <img src={ carteira } alt="carteira" />
          </div>
          <div className="inputs-form">
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              className="form-control"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              className="form-control"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <button
              disabled={ isButtonDisabled }
              type="submit"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setUserEmail: (email) => dispatch(userEmail(email)),
});

Login.propTypes = {
  setUserEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
