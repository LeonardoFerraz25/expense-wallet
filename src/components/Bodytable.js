import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { delExpense, IDeditExpense, IsEditExpense } from '../actions';

export class Bodytable extends Component {
  setEditExpense = (expense) => {
    const { setID, IsEdit } = this.props;
    setID(expense);
    IsEdit();
  }

  render() {
    const { tableList, delExpenseList } = this.props;
    return (
      <tbody>
        {tableList.map(
          (expense) => {
            const { id,
              description, tag, method, value, currency, exchangeRates } = expense;
            return (
              <tr key={ id }>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>
                  {(exchangeRates[currency].name).split('/')[0]}
                </td>
                <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                <td>
                  {(value * exchangeRates[currency].ask).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td className="buttons">
                  <button
                    type="button"
                    data-testid="edit-btn"
                    className="edit-btn"
                    onClick={ () => this.setEditExpense(expense) }
                  >
                    <span className="material-symbols-outlined">
                      edit_note
                    </span>
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="delete-btn"
                    onClick={ () => delExpenseList(id) }
                  >
                    <span className="material-symbols-outlined">
                      close
                    </span>
                  </button>
                </td>
              </tr>
            );
          },
        )}
      </tbody>
    );
  }
}

Bodytable.propTypes = {
  tableList: PropTypes.arrayOf.isRequired,
  delExpenseList: PropTypes.func.isRequired,
  IsEdit: PropTypes.func.isRequired,
  setID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tableList: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  delExpenseList: (id) => dispatch(delExpense(id)),
  IsEdit: () => dispatch(IsEditExpense()),
  setID: (expense) => dispatch(IDeditExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bodytable);
