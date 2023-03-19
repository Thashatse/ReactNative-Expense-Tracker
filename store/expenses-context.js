import { createContext, useReducer } from 'react';

const DUMMY_EXPENSE = [
  {
    id: "e1",
    description: "Groceries",
    amount: 750.59,
    date: new Date("2023-02-13"),
  },
  {
    id: "e2",
    description: "Take Out",
    amount: 101.01,
    date: new Date("2023-03-13"),
  },
  {
    id: "e3",
    description: "Bike Repair",
    amount: 1989,
    date: new Date("2023-03-08"),
  },
  {
    id: "e4",
    description: "Drinks",
    amount: 205,
    date: new Date("2023-03-01"),
  },
  {
    id: "e5",
    description: "Groceries",
    amount: 750.59,
    date: new Date("2023-03-19"),
  },
  {
    id: "e6",
    description: "Take Out",
    amount: 101.01,
    date: new Date("2023-03-18"),
  },
  {
    id: "e7",
    description: "Personal Care",
    amount: 205,
    date: new Date("2023-03-15"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  // console.log('state: ' + state);

  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedExpense = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      // console.log('Start: ' + action.type);
      // console.log('action.payload: ' + action.payload);

      return state.filter((expense) => {
        // console.log('expense.id: ' + expense.id);
        // console.log('action.payload: ' + action.payload);
        // console.log('expense.id !== action.payload: ' + expense.id !== action.payload);
        return expense.id !== action.payload;
      });
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSE);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
