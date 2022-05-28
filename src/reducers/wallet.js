const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editExpense: false,
  idExpenseEdit: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return {
      ...state, expenses: [...state.expenses, action.payload],
    };
  case 'DEL_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses
        .filter((expense) => expense.id !== action.payload)],
    };
  case 'ADD_COINS':
    return {
      ...state, currencies: action.payload,
    };
  case 'IS_EDIT_EXPENSE':
    return {
      ...state, editExpense: true,
    };
  case 'ID_EXPENSE':
    return {
      ...state, idExpenseEdit: action.payload,
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      editExpense: false,
    };
  default:
    return state;
  }
};

export default wallet;
