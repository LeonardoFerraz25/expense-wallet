export const userEmail = (email) => ({
  type: 'SET_EMAIL',
  payload: email,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  payload: expense,
});

export const delExpense = (id) => ({
  type: 'DEL_EXPENSE',
  payload: id,
});

export const addCoins = (coins) => ({
  type: 'ADD_COINS',
  payload: coins,
});

export const IsEditExpense = () => ({
  type: 'IS_EDIT_EXPENSE',
});

export const editExpense = (expense) => ({
  type: 'EDIT_EXPENSE',
  payload: expense,
});

export const IDeditExpense = (expense) => ({
  type: 'ID_EXPENSE',
  payload: expense,
});
