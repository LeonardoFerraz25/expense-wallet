import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Header.css';
import carteira from '../imagens/wallet.png';

class Header extends React.Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <div className="wrapper-icon-wallet">
          <img src={ carteira } alt="" />
        </div>
        <div className="user">
          <p>
            Email:
            <span className="email-field" data-testid="email-field">{email}</span>
          </p>
          <div className="fiel">
            <p>
              Despesas:
              <span
                className="total-field"
                data-testid="total-field"
              >
                { parseFloat(total).toFixed(2) }
              </span>
            </p>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expenses
    .reduce((total,
      { value,
        currency,
        exchangeRates }) => total + value * exchangeRates[currency].ask, 0),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
