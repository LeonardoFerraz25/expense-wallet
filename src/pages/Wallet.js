import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Header from '../components/Header';
import Table from '../components/Table';
import { addExpense } from '../actions';
import FormEdit from '../components/FormEdit';

class Wallet extends React.Component {
  sendExpense = (expense) => {
    const { setExpense } = this.props;
    setExpense(expense);
  }

  render() {
    const { IsEdit } = this.props;
    return (
      <div>
        <Header />
        {IsEdit
          ? <FormEdit />
          : <Form sendExpense={ this.sendExpense } /> }
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  setExpense: PropTypes.func.isRequired,
  IsEdit: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  IsEdit: state.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  setExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
