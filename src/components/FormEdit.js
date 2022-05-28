import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editExpense } from '../actions';
import '../css/FormEdit.css';

export class FormEdit extends Component {
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
    const { expenseEdit } = this.props;
    this.setState(expenseEdit);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = () => {
    const { setEditExpense } = this.props;
    setEditExpense(this.state);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const moedas = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ];
    return (
      <form
        onSubmit={ this.handleSubmit }
        className="edit-form"
      >
        <label htmlFor="value">
          Valor:
          <input
            className="form-control"
            data-testid="value-input"
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
          <label htmlFor="method">
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
        <button className="edit-button" type="submit">Editar despesa</button>
      </form>
    );
  }
}

FormEdit.propTypes = {
  setEditExpense: PropTypes.func.isRequired,
  expenseEdit: PropTypes.objectOf.isRequired,
};

const mapStateToProps = (state) => ({
  expenseEdit: state.wallet.idExpenseEdit,
});

const mapDispatchToProps = (dispatch) => ({
  setEditExpense: (expense) => dispatch(editExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormEdit);
