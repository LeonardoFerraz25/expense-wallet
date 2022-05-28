import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchMoedas from '../helpers/moedas';
import { addCoins } from '../actions';
import '../css/Form.css';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    this.getMoedas();
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getMoedas();
    this.setState((state) => ({ id: state.id + 1 }));
    const { sendExpense } = this.props;
    sendExpense(this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
    });
  }

  getMoedas = async () => {
    const { setCurrencies } = this.props;
    const moedas = await fetchMoedas();
    const filterMoedas = Object.keys(moedas).filter((iten) => iten !== 'USDT');
    this.setState({ exchangeRates: moedas });
    setCurrencies(filterMoedas);
  }

  render() {
    const { moedas } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="add-expense" onSubmit={ this.handleSubmit }>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            className="form-control"
            onChange={ this.handleChange }
            type="text"
            name="value"
            id="value"
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            className="form-control"
            data-testid="description-input"
            onChange={ this.handleChange }
            type="text"
            name="description"
            id="description"
            value={ description }
          />
        </label>
        <div className="select">
          <label htmlFor="currency">
            Moeda:
            <select
              className="form-control"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
              name="currency"
              id="currency"
            >
              { moedas.map((moeda) => (
                <option key={ moeda } value={ moeda }>{moeda}</option>
              )) }
            </select>
          </label>
          <label className="method" htmlFor="method">
            Método de pagamento:
            <select
              className="form-control"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
              name="method"
              id="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              className="form-control"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
              name="tag"
              id="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="subimit-expense"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  moedas: PropTypes.objectOf.isRequired,
  setCurrencies: PropTypes.func.isRequired,
  sendExpense: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moedas: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: (coins) => dispatch(addCoins(coins)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
